const LEAST = 0
const MOST = 10

export function heldIntent(intent: number): number {
  return Math.min(Math.max(intent, LEAST), MOST)
}
