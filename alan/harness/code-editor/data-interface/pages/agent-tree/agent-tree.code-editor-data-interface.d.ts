declare type AgentTreeRow = TreeRow & {
  readonly kind: "root" | "seat" | "subagent"
  readonly live: boolean
  readonly stopped: boolean
  readonly place: "interactive" | "headless" | null
  readonly state: string | null
  readonly waitingOn: string | null
  readonly children: readonly AgentTreeRow[]
}

declare type AgentTreeState = {
  readonly roots: readonly AgentTreeRow[]
  readonly alanPrincipalCount: number
  readonly runningCount: number
  readonly unreadSeats: number
}
