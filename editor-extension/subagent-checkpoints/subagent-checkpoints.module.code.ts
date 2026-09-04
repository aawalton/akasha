import { mkdir, open, readFile, rename, writeFile } from "node:fs/promises"
import * as os from "node:os"
import * as path from "node:path"
import { z } from "zod"
import type { SubagentState } from "../subagent-core/subagent-core.module.code.ts"

const ANCHOR_BYTES = 64

const STRING_PAIRS = z.array(z.tuple([z.string(), z.string()]))

const BANKED = z.object({
  path: z.string(),
  offset: z.number().int().positive(),
  anchor: z.string(),
  labels: STRING_PAIRS,
  agentByTool: STRING_PAIRS,
  running: z.array(z.tuple([z.string(), z.boolean()])),
  awaiting: z.array(z.string()),
})

const BOOK = z.object({
  version: z.literal(1),
  cursors: z.record(z.string(), BANKED),
})

export interface Checkpoint {
  readonly path: string
  readonly offset: number
  readonly anchor: string
  readonly state: SubagentState
}

export function checkpointBook(): string {
  return path.join(os.homedir(), ".cache", "ops", "agent-tree-cursors.json")
}

export async function anchorEnding(filePath: string, offset: number): Promise<string | null> {
  if (offset <= 0) {
    return null
  }
  const from = Math.max(0, offset - ANCHOR_BYTES)
  const wanted = offset - from
  const buffer = Buffer.allocUnsafe(wanted)
  let handle
  try {
    handle = await open(filePath, "r")
  } catch {
    return null
  }
  try {
    const { bytesRead } = await handle.read(buffer, 0, wanted, from)
    if (bytesRead !== wanted) {
      return null
    }
  } catch {
    return null
  } finally {
    await handle.close()
  }
  return buffer.toString("base64")
}

export async function readCheckpoints(): Promise<ReadonlyMap<string, Checkpoint>> {
  const held = new Map<string, Checkpoint>()
  let text: string
  try {
    text = await readFile(checkpointBook(), "utf8")
  } catch {
    return held
  }
  let read: unknown
  try {
    read = JSON.parse(text)
  } catch {
    return held
  }
  const parsed = BOOK.safeParse(read)
  if (!parsed.success) {
    return held
  }
  for (const [key, one] of Object.entries(parsed.data.cursors)) {
    held.set(key, {
      path: one.path,
      offset: one.offset,
      anchor: one.anchor,
      state: {
        labels: new Map(one.labels),
        agentByTool: new Map(one.agentByTool),
        running: new Map(one.running),
        awaiting: new Set(one.awaiting),
      },
    })
  }
  return held
}

export async function writeCheckpoints(held: ReadonlyMap<string, Checkpoint>): Promise<undefined> {
  const cursors: Record<string, z.infer<typeof BANKED>> = {}
  for (const [key, one] of held) {
    cursors[key] = {
      path: one.path,
      offset: one.offset,
      anchor: one.anchor,
      labels: [...one.state.labels],
      agentByTool: [...one.state.agentByTool],
      running: [...one.state.running],
      awaiting: [...one.state.awaiting],
    }
  }
  const at = checkpointBook()
  const beside = `${at}.${process.pid}`
  await mkdir(path.dirname(at), { recursive: true })
  await writeFile(beside, JSON.stringify({ version: 1, cursors }))
  await rename(beside, at)
  return undefined
}
