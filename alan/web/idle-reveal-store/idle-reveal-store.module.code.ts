import type { DrawReveal } from "@akasha/idle-system/draw"

let current: DrawReveal | null = null
const listeners = new Set<() => void>()

function notify(): undefined {
  for (const listener of listeners) listener()
}

export function pushReveal(reveal: DrawReveal): undefined {
  current = reveal
  notify()
}

export function clearReveal(): undefined {
  if (current === null) return
  current = null
  notify()
}

export function subscribeReveal(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getRevealSnapshot(): DrawReveal | null {
  return current
}
