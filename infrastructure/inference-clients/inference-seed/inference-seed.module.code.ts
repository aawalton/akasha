import { webcrypto } from "node:crypto"

export function resolveSeed(explicit: number | undefined, randomInt: () => number): number {
  if (explicit !== undefined) return explicit
  return randomInt()
}

export const SEED_MAX = 2 ** 31 - 1

export function drawSeed(): number {
  const buf = new Uint32Array(1)
  webcrypto.getRandomValues(buf)
  return (buf[0] ?? 0) & SEED_MAX
}
