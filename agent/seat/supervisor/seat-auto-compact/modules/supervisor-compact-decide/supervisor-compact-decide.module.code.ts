export type CompactObservation = {
  readonly idle: boolean
  readonly compacting: boolean
  readonly contextTokens: number | null
  readonly ceiling: number | null
}

type CompactReading = Omit<CompactObservation, "idle">

type CompactTurn = {
  readonly activeTurn: boolean | undefined
  readonly sendInFlight: boolean
}

export function betweenTurns(turn: CompactTurn): boolean {
  return turn.activeTurn === false && !turn.sendInFlight
}

function pastCompactCeiling(contextTokens: number | null, ceiling: number | null): boolean {
  return contextTokens !== null && ceiling !== null && contextTokens >= ceiling
}

export function worthProbing(reading: CompactReading, asked: boolean): boolean {
  return !asked && !reading.compacting && pastCompactCeiling(reading.contextTokens, reading.ceiling)
}

export function shouldCompact(obs: CompactObservation, asked: boolean): boolean {
  return worthProbing(obs, asked) && obs.idle
}

export function stillAsked(
  asked: boolean,
  contextTokens: number | null,
  ceiling: number | null
): boolean {
  if (!asked) return false
  return contextTokens === null || pastCompactCeiling(contextTokens, ceiling)
}
