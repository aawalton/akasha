import { keepBeside } from "akasha/agents/seats/modules/beside/seat-beside.module.code.ts"
import { seatNameForAgent } from "akasha/agents/seats/modules/presence-read/seat-presence-read.module.code.ts"
import { akashaObservedOf } from "akasha/seat-system/seat-akasha-read/seat-akasha-read.module.code.ts"

const CLEARED = {
  requestedAction: null,
  interruptMessage: null,
  restartArmedAt: null,
} as const

export function controlOf(agentId: string): Record<string, unknown> | null {
  return akashaObservedOf(agentId)
}

export function requestedActionOf(agentId: string): string | null {
  const held = controlOf(agentId)?.requestedAction
  return typeof held === "string" && held !== "" ? held : null
}

export function setControl(agentId: string, values: Record<string, unknown>): undefined {
  const seatName = seatNameForAgent(agentId)
  if (seatName === null) {
    throw new Error(
      `no seat stands in akasha for agent ${agentId}, so there is nothing beside a page to carry the request. ` +
        "A seat that is not there has no agent present in it, and a request reaches only a running seat."
    )
  }
  keepBeside(seatName, { ...CLEARED, ...values })
}

export function clearControl(agentId: string): undefined {
  const seatName = seatNameForAgent(agentId)
  if (seatName === null) return
  keepBeside(seatName, CLEARED)
}
