export interface ConsumableStack {
  readonly bag: number
  readonly index: number
  size: number
  readonly tier: number
  readonly isCrown: boolean
}

export function needsRecharge(charge: number, maxCharge: number, threshold: number): boolean {
  if (maxCharge <= 0) return false
  if (charge >= maxCharge) return false
  return charge / maxCharge <= threshold
}

export function needsRepair(condition: number, threshold: number): boolean {
  return condition / 100 <= threshold
}

export function orderSoulGems(
  gems: readonly ConsumableStack[],
  useCrownFirst: boolean
): ConsumableStack[] {
  const result = gems.slice()
  if (useCrownFirst) {
    result.sort((x, y) => y.tier - x.tier)
  } else {
    result.sort((x, y) => x.tier - y.tier)
  }
  return result
}

export function orderRepairKits(
  kits: readonly ConsumableStack[],
  opts: { dontUseCrown: boolean; useCrownFirst: boolean }
): ConsumableStack[] {
  const pool = opts.dontUseCrown ? kits.filter((k) => !k.isCrown) : kits.slice()
  if (opts.useCrownFirst && !opts.dontUseCrown) {
    const normal = pool.filter((k) => !k.isCrown).sort((x, y) => y.tier - x.tier)
    const crown = pool.filter((k) => k.isCrown)
    return [...normal, ...crown]
  }
  return pool.slice().sort((x, y) => y.tier - x.tier)
}
