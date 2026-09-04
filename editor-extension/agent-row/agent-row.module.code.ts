import type { SeatMode } from "../seat-mode/seat-mode.module.code.ts"

export type AgentKind = "seat" | "subagent"

export interface AgentNode {
  readonly id: string
  readonly name: string
  readonly kind: AgentKind
  readonly place?: SeatMode
  readonly live: boolean
  readonly state?: string | undefined
  readonly waitingOn?: string | undefined
  readonly color?: string | undefined
  readonly at?: string | undefined
  readonly children: readonly AgentNode[]
}

export interface SeatClick {
  readonly id: string
  readonly name: string
}
