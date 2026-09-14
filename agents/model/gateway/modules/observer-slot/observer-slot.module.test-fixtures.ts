import type { ObserverSlot } from "akasha/agents/model/gateway/modules/observer-slot/observer-slot.module.code.ts"

export function emptySlot(): ObserverSlot {
  return { current: null }
}
