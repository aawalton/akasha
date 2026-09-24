export interface StockTierDepositInput {
  readonly stackCount: number
  readonly backpackCount: number
  readonly selfTarget: number
  readonly alreadyDispatched: number
  readonly tierCap: number | undefined
  readonly tierAccountWideCount: number
  readonly handOff: number
}

export function stockHandOff(fillTarget: number, heldByOthers: readonly number[]): number {
  let handOff = 0
  for (const held of heldByOthers) handOff += Math.max(0, fillTarget - held)
  return handOff
}

export function computeStockTierDeposit(input: StockTierDepositInput): number {
  const excess = Math.max(0, input.backpackCount - input.selfTarget - input.alreadyDispatched)
  let allowed = excess
  if (input.tierCap !== undefined) {
    const capRemaining = Math.max(
      0,
      input.tierCap + input.handOff - input.tierAccountWideCount - input.alreadyDispatched
    )
    allowed = Math.min(allowed, capRemaining)
  }
  return Math.max(0, Math.min(input.stackCount, allowed))
}
