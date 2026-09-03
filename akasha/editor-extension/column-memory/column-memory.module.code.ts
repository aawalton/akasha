import type * as vscode from "vscode"
import { z } from "zod"
import type { ColumnNumber } from "../editor-group/editor-group.module.code.ts"
import type { SeatTerminal } from "../seat-terminals/seat-terminals.module.code.ts"

const MEMENTO_KEY = "opsAgentTree.lastSeenColumn"

const MAX_REMEMBERED = 200

export interface ColumnMemory {
  readonly record: (seen: readonly SeatTerminal[]) => undefined
  readonly recall: (seatName: string) => ColumnNumber | undefined
}

const STORED_SCHEMA = z.array(z.tuple([z.string().min(1), z.number().int().min(1)]))

function readStored(memento: vscode.Memento): readonly (readonly [string, ColumnNumber])[] {
  const parsed = STORED_SCHEMA.safeParse(memento.get(MEMENTO_KEY))
  return parsed.success ? parsed.data : []
}

export function createColumnMemory(memento: vscode.Memento): ColumnMemory {
  const remembered = new Map<string, ColumnNumber>(readStored(memento))

  return {
    record: (seen: readonly SeatTerminal[]) => {
      let changed = false
      for (const { name, column } of seen) {
        if (column === undefined) {
          continue
        }
        if (remembered.get(name) !== column) {
          changed = true
        }
        remembered.delete(name)
        remembered.set(name, column)
      }
      while (remembered.size > MAX_REMEMBERED) {
        const oldest = remembered.keys().next()
        if (oldest.done === true) {
          break
        }
        remembered.delete(oldest.value)
        changed = true
      }
      if (changed) {
        void memento.update(MEMENTO_KEY, [...remembered.entries()])
      }
      return undefined
    },
    recall: (seatName: string) => remembered.get(seatName),
  }
}
