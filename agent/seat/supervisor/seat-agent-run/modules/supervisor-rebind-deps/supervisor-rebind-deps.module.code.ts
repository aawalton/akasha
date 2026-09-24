import { keepSeatSession } from "akasha/agent/seat/supervisor/supervisor-timer/modules/supervisor-heartbeat-beat/supervisor-heartbeat-beat.module.code.ts"

export interface StatedAgentSlots {
  readonly role?: string
  readonly domain?: string
  readonly persona?: string
  readonly mode?: string
  readonly principal?: string
}

export interface ClearRebindDeps {
  setSessionId: (agentId: string, sessionId: string) => Promise<void>
  bindAgentName: (
    agentId: string,
    name: string,
    displayTitle?: string,
    stated?: StatedAgentSlots
  ) => Promise<void>
}

async function setSessionId(agentId: string, sessionId: string): Promise<void> {
  keepSeatSession(agentId, sessionId)
}

export function liveRebindDepsWith(
  bindAgentName: ClearRebindDeps["bindAgentName"]
): ClearRebindDeps {
  return {
    setSessionId,
    bindAgentName,
  }
}
