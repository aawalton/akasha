import { readdir, readFile, stat } from "node:fs/promises"
import * as path from "node:path"
import { z } from "zod"
import { commandPath, runCommand } from "../harness-call/harness-call.module.code.ts"

export interface SeatTranscript {
  readonly agentId: string
  readonly seatName: string
  readonly transcriptPath: string
}

export interface SubagentTranscript {
  readonly toolUseId: string
  readonly agentType: string | null
  readonly description: string | null
  readonly filePath: string
}

const CALL_TIMEOUT_MS = 30_000

const MAX_BUFFER = 4 * 1024 * 1024

const HOLD_MS = 5_000

let held: { readonly at: number; readonly seats: readonly SeatTranscript[] } | null = null

export function dropSeatTranscripts(): void {
  held = null
}

function seatsIn(answered: unknown): readonly SeatTranscript[] {
  if (
    answered === null ||
    typeof answered !== "object" ||
    !Array.isArray((answered as { seats?: unknown }).seats)
  ) {
    throw new Error("seat-transcripts: the answer carries no `seats` array")
  }
  return (answered as { seats: readonly unknown[] }).seats.map((raw, at) => {
    if (raw === null || typeof raw !== "object") {
      throw new Error(`seat-transcripts: seats[${at}] is not an object`)
    }
    const row = raw as Record<string, unknown>
    if (
      typeof row.agentId !== "string" ||
      typeof row.seatName !== "string" ||
      typeof row.transcriptPath !== "string"
    ) {
      throw new Error(
        `seat-transcripts: seats[${at}] carries no agentId, seatName and transcriptPath`
      )
    }
    return { agentId: row.agentId, seatName: row.seatName, transcriptPath: row.transcriptPath }
  })
}

export async function readSeatTranscripts(): Promise<readonly SeatTranscript[]> {
  const now = Date.now()
  if (held !== null && now - held.at < HOLD_MS) {
    return held.seats
  }
  const stdout = await runCommand(commandPath("seat-transcripts"), [], {
    timeout: CALL_TIMEOUT_MS,
    maxBuffer: MAX_BUFFER,
  })
  let answered: unknown
  try {
    answered = JSON.parse(stdout)
  } catch (err) {
    throw new Error(`seat-transcripts did not print JSON: ${String(err)}`)
  }
  const seats = seatsIn(answered)
  held = { at: now, seats }
  return seats
}

export async function seatTranscriptOf(agentId: string): Promise<SeatTranscript | null> {
  return (await readSeatTranscripts()).find((seat) => seat.agentId === agentId) ?? null
}

const subagentMetaSchema = z.looseObject({
  toolUseId: z.string(),
  agentType: z.string().optional(),
  description: z.string().optional(),
})

async function readSubagentMetaAt(
  filePath: string
): Promise<z.infer<typeof subagentMetaSchema> | null> {
  try {
    const text = await readFile(filePath, "utf8")
    const parsed = subagentMetaSchema.safeParse(JSON.parse(text))
    return parsed.success ? parsed.data : null
  } catch {
    return null
  }
}

export async function readSubagentsIn(
  subagentsDir: string
): Promise<ReadonlyMap<string, SubagentTranscript>> {
  const byToolUseId = new Map<string, SubagentTranscript>()

  let names: readonly string[]
  try {
    names = await readdir(subagentsDir)
  } catch {
    return byToolUseId
  }

  for (const name of names) {
    if (!name.endsWith(".meta.json")) {
      continue
    }
    const meta = await readSubagentMetaAt(path.join(subagentsDir, name))
    if (meta === null) {
      continue
    }

    const jsonlName = name.replace(/\.meta\.json$/, ".jsonl")
    const filePath = path.join(subagentsDir, jsonlName)
    try {
      await stat(filePath)
    } catch {
      continue
    }

    byToolUseId.set(meta.toolUseId, {
      toolUseId: meta.toolUseId,
      agentType: meta.agentType ?? null,
      description: meta.description ?? null,
      filePath,
    })
  }
  return byToolUseId
}
