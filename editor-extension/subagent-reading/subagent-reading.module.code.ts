import * as path from "node:path"
import { z } from "zod"
import {
  anchorEnding,
  type Checkpoint,
  readCheckpoints,
  writeCheckpoints,
} from "../subagent-checkpoints/subagent-checkpoints.module.code.ts"
import {
  applyRecord,
  emptySubagentState,
  isJsonObject,
  type RunningSubagent,
  runningSubagents,
  type SubagentState,
} from "../subagent-core/subagent-core.module.code.ts"
import { emptyTail, foldTail, type Tail } from "../tail-fold/tail-fold.module.code.ts"

const TRANSCRIPT_RECORD = z.custom<Record<string, unknown>>(isJsonObject)

export interface SubagentNode {
  readonly key: string
  readonly label: string
  readonly agentId: string | null
  readonly children: readonly SubagentNode[]
}

const MAX_SUBAGENT_DEPTH = 5

interface Cursor {
  path: string
  tail: Tail
  state: SubagentState
}

export interface SubagentReader {
  readonly forSeat: (agentId: string, transcriptPath: string) => Promise<readonly SubagentNode[]>
  readonly dropUntouched: () => Promise<undefined>
}

const BANK_INTERVAL_MS = 10_000

export function createSubagentReader(): SubagentReader {
  const cursors = new Map<string, Cursor>()
  const touched = new Set<string>()
  const bankedBook = readCheckpoints().catch(() => new Map<string, Checkpoint>())
  let moved = false
  let bankedAt = 0

  const advance = async (cursorKey: string, filePath: string): Promise<SubagentState> => {
    touched.add(cursorKey)
    let held = cursors.get(cursorKey)
    if (held === undefined || held.path !== filePath) {
      let tail = emptyTail()
      let state = held?.state ?? emptySubagentState()
      if (held === undefined) {
        const banked = (await bankedBook).get(cursorKey)
        if (banked !== undefined && banked.path === filePath) {
          tail = { offset: banked.offset, anchor: banked.anchor }
          state = banked.state
        }
      }
      held = { path: filePath, tail, state }
      cursors.set(cursorKey, held)
      moved = true
    }

    const cursor = held
    const fold = await foldTail(cursor.tail, filePath, {
      line: (line) => {
        if (line.trim().length === 0) {
          return undefined
        }
        try {
          const parsed = TRANSCRIPT_RECORD.safeParse(JSON.parse(line))
          if (parsed.success) {
            applyRecord(cursor.state, parsed.data)
          }
        } catch {
          return undefined
        }
        return undefined
      },
      reset: () => {
        cursor.state = emptySubagentState()
        return undefined
      },
    })
    if (fold.folded > 0) {
      moved = true
    }
    return cursor.state
  }

  const descend = async (
    running: readonly RunningSubagent[],
    subagentsDir: string,
    depth: number
  ): Promise<readonly SubagentNode[]> => {
    const nodes: SubagentNode[] = []
    for (const subagent of running) {
      let children: readonly SubagentNode[] = []
      if (subagent.agentId !== null && depth < MAX_SUBAGENT_DEPTH) {
        const childPath = path.join(subagentsDir, `agent-${subagent.agentId}.jsonl`)
        const state = await advance(childPath, childPath)
        children = await descend(runningSubagents(state), subagentsDir, depth + 1)
      }
      nodes.push({
        key: subagent.key,
        label: subagent.label,
        agentId: subagent.agentId,
        children,
      })
    }
    return nodes
  }

  const bank = async (): Promise<undefined> => {
    const writing = new Map<string, Checkpoint>()
    for (const [key, cursor] of cursors) {
      if (cursor.tail.offset <= 0) {
        continue
      }
      const anchor = await anchorEnding(cursor.path, cursor.tail.offset)
      if (anchor === null) {
        continue
      }
      writing.set(key, {
        path: cursor.path,
        offset: cursor.tail.offset,
        anchor,
        state: cursor.state,
      })
    }
    await writeCheckpoints(writing)
    return undefined
  }

  return {
    forSeat: async (agentId: string, transcriptPath: string) => {
      const state = await advance(agentId, transcriptPath)
      const subagentsDir = path.join(transcriptPath.replace(/\.jsonl$/, ""), "subagents")
      return descend(runningSubagents(state), subagentsDir, 1)
    },
    dropUntouched: async () => {
      for (const key of [...cursors.keys()]) {
        if (!touched.has(key)) {
          cursors.delete(key)
          moved = true
        }
      }
      touched.clear()
      const now = Date.now()
      if (moved && now - bankedAt >= BANK_INTERVAL_MS) {
        moved = false
        bankedAt = now
        await bank().catch(() => undefined)
      }
      return undefined
    },
  }
}
