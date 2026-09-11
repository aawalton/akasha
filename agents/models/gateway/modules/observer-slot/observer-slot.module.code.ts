import type { ArmableStreamObserver } from "akasha/agents/models/gateway/modules/transport-log/transport-log.module.code.ts"

export type ObserverSlot = {
  current: ArmableStreamObserver | null
  endInFlight?: () => void
}

export function emptySlot(): ObserverSlot {
  return { current: null }
}

export function buildEndInFlightOnce(end: () => void): () => undefined {
  let ended = false
  return (): undefined => {
    if (ended) return
    ended = true
    end()
  }
}
