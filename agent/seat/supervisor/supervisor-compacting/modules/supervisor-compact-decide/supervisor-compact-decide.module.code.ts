export const COMPACT_AT_TOKENS = 350_000

export type CompactObservation = {
  readonly idle: boolean
  readonly compacting: boolean
  readonly contextTokens: number | null
}

export type CompactReading = Pick<CompactObservation, "compacting" | "contextTokens">

export function pastCompactCeiling(contextTokens: number | null): boolean {
  return contextTokens !== null && contextTokens >= COMPACT_AT_TOKENS
}

export function worthProbing(reading: CompactReading, asked: boolean): boolean {
  return !asked && !reading.compacting && pastCompactCeiling(reading.contextTokens)
}

export function shouldCompact(obs: CompactObservation, asked: boolean): boolean {
  return worthProbing(obs, asked) && obs.idle
}

export function stillAsked(asked: boolean, contextTokens: number | null): boolean {
  if (!asked) return false
  return contextTokens === null || pastCompactCeiling(contextTokens)
}
