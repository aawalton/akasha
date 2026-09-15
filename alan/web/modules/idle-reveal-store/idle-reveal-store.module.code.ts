import type { DrawReveal } from "akasha/alan/harness/idle-system/modules/idle-draw/idle-draw.module.code.ts"
import { listenerSet } from "akasha/design/interface/primitive/modules/listener-set/listener-set.module.code.ts"

let current: DrawReveal | null = null
const listeners = listenerSet()

export function pushReveal(reveal: DrawReveal): undefined {
  current = reveal
  listeners.tell()
}

export function clearReveal(): undefined {
  if (current === null) return
  current = null
  listeners.tell()
}

export function subscribeReveal(listener: () => void): () => void {
  return listeners.subscribe(listener)
}

export function getRevealSnapshot(): DrawReveal | null {
  return current
}
