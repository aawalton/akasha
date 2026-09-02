import type { ArmableStreamObserver } from "../transport-log/transport-log.module.code.ts"

export type ObserverSlot = {
  current: ArmableStreamObserver | null
  endInFlight?: () => void
}

export function buildEndInFlightOnce(end: () => void): () => undefined {
  let ended = false
  return (): undefined => {
    if (ended) return
    ended = true
    end()
  }
}
