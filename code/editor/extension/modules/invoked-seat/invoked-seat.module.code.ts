import type { AgentTreeRow } from "akasha/alan/harness/code-editor/data-interface/pages/agent-tree/agent-tree.code-editor-data-interface.code.ts"
import { seatTabs } from "akasha/code/editor/extension/modules/agent-tree-state/agent-tree-state.module.code.ts"
import {
  SEAT_MODE_SCHEMA,
  type SeatMode,
} from "akasha/code/editor/extension/modules/seat-mode/seat-mode.module.code.ts"
import * as vscode from "vscode"
import { z } from "zod"

export interface SeatClick {
  readonly id: string
  readonly name: string
}

const SEAT_CLICK_SCHEMA = z.looseObject({ id: z.string().min(1), name: z.string().min(1) })

export function parseSeatClick(clicked: unknown): SeatClick | undefined {
  const parsed = SEAT_CLICK_SCHEMA.safeParse(clicked)
  return parsed.success ? { id: parsed.data.id, name: parsed.data.name } : undefined
}

const SEAT_ROW_SCHEMA = z.looseObject({
  key: z.string().min(1),
  label: z.string(),
  kind: z.literal("seat"),
  live: z.boolean(),
  place: SEAT_MODE_SCHEMA,
})

export interface ToggleTarget {
  readonly id: string
  readonly name: string
  readonly kind: "seat"
  readonly live: boolean
  readonly place: SeatMode
}

function asToggleTarget(value: unknown): ToggleTarget | undefined {
  const parsed = SEAT_ROW_SCHEMA.safeParse(value)
  return parsed.success
    ? {
        id: parsed.data.key,
        name: parsed.data.label,
        kind: parsed.data.kind,
        live: parsed.data.live,
        place: parsed.data.place,
      }
    : undefined
}

const TERMINAL_SCHEME = "vscode-terminal"

function seatForTab(value: unknown): AgentTreeRow | undefined {
  if (!(value instanceof vscode.Uri) || value.scheme !== TERMINAL_SCHEME) {
    return undefined
  }
  const last = value.path.split("/").at(-1)
  if (last === undefined) {
    return undefined
  }
  const instanceId = Number(last)
  if (!Number.isInteger(instanceId)) {
    return undefined
  }
  return seatTabs.get(instanceId)
}

export function invokedSeat(value: unknown): ToggleTarget | undefined {
  return asToggleTarget(seatForTab(value) ?? value)
}
