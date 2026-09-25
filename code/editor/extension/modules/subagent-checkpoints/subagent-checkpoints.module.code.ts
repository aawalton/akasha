import { mkdir, readFile, rename, writeFile } from "node:fs/promises"
import * as os from "node:os"
import * as path from "node:path"
import type { SubagentState } from "akasha/code/editor/extension/modules/subagent-core/subagent-core.module.code.ts"
import { z } from "zod"

const STRING_PAIRS = z.array(z.tuple([z.string(), z.string()]))

const BANKED = z.object({
  path: z.string(),
  offset: z.number().int().positive(),
  anchor: z.string(),
  labels: STRING_PAIRS,
  agentByTool: STRING_PAIRS,
  running: z.array(z.tuple([z.string(), z.boolean()])),
  awaiting: z.array(z.string()),
  endedAt: z.array(z.tuple([z.string(), z.number()])),
})

const VERSION = 2

const BOOK = z.object({
  version: z.literal(VERSION),
  cursors: z.record(z.string(), BANKED),
})

export interface Checkpoint {
  readonly path: string
  readonly offset: number
  readonly anchor: string
  readonly state: SubagentState
}

function checkpointBook(): string {
  return path.join(os.homedir(), ".cache", "ops", "agent-tree-cursors.json")
}

function parseBook(text: string): z.infer<typeof BOOK> | null {
  try {
    const parsed = BOOK.safeParse(JSON.parse(text))
    return parsed.success ? parsed.data : null
  } catch {
    return null
  }
}

export async function readCheckpoints(): Promise<ReadonlyMap<string, Checkpoint>> {
  const held = new Map<string, Checkpoint>()
  let text: string
  try {
    text = await readFile(checkpointBook(), "utf8")
  } catch {
    return held
  }
  const book = parseBook(text)
  if (book === null) {
    return held
  }
  for (const [key, one] of Object.entries(book.cursors)) {
    held.set(key, {
      path: one.path,
      offset: one.offset,
      anchor: one.anchor,
      state: {
        labels: new Map(one.labels),
        agentByTool: new Map(one.agentByTool),
        running: new Map(one.running),
        awaiting: new Set(one.awaiting),
        endedAt: new Map(one.endedAt),
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
      endedAt: [...one.state.endedAt],
    }
  }
  const at = checkpointBook()
  const beside = `${at}.${process.pid}`
  await mkdir(path.dirname(at), { recursive: true })
  await writeFile(beside, JSON.stringify({ version: VERSION, cursors }))
  await rename(beside, at)
  return undefined
}
