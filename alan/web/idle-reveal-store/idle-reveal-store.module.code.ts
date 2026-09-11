import type { DrawReveal } from "akasha/alan/harness/idle-system/idle-draw/idle-draw.module.code.ts"
import { listenerSet } from "akasha/design/interfaces/primitives/listener-set/listener-set.module.code.ts"

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
