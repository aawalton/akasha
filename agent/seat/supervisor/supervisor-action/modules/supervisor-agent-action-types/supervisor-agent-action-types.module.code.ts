export type AgentActionEvent =
  | { action: "restart-now"; interruptMessage: string | null }
  | {
      action: "restart"
      interruptMessage: string | null
      restartArmedAt: number | null
    }
  | { action: "swap-proxy" }

export type PendingAgentAction = {
  event: AgentActionEvent
  maintenance: boolean
}

export interface AgentActionSubsystem {
  handleAgentAction: (event: AgentActionEvent) => Promise<undefined>
  pendingEvent: { value: PendingAgentAction | null }
  deferredRestart: { cancel: (() => void) | null }
  wasSupervisorKill: () => boolean
  armPreCliffRestart: () => Promise<boolean>
}
