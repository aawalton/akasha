// THE SHAPE OF A DRAWN ROW, HELD APART FROM THE READING THAT FILLS IT.
//
// `forest.ts` composes these and `lookup.ts` walks them, and `forest.ts` calls into `lookup.ts` to
// do it. Holding the shape here leaves that one call as the only edge between the two, so each can
// land on its own; naming the shape from its composer would put an edge back the other way and
// neither could land first.
import type { SeatMode } from "@akasha/editor-extension/seat-mode"

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
  // The absolute path of the page akasha holds for this agent, or undefined where it holds none.
  // A row carrying undefined names no page anywhere it draws: not in its tooltip and not in
  // anything it opens.
  readonly at?: string | undefined
  readonly children: readonly AgentNode[]
}
