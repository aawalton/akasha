export type VaultDepositPlan =
  | { readonly kind: "none" }
  | { readonly kind: "stow-all"; readonly slots: number[] }
  | {
      readonly kind: "stow-all-then-take-back"
      readonly slots: number[]
      readonly takeBack: number[]
    }
  | { readonly kind: "moves"; readonly slots: number[] }

export function planVaultDeposit(
  this: void,
  pending: readonly number[],
  stowable: readonly number[],
  vaultFreeSlots: number
): VaultDepositPlan {
  const isStowable: Record<number, boolean> = {}
  for (const slot of stowable) isStowable[slot] = true
  const chosen: Record<number, boolean> = {}
  const slots: number[] = []
  for (const slot of pending) {
    if (isStowable[slot] !== true || chosen[slot] === true) continue
    chosen[slot] = true
    slots.push(slot)
  }
  if (slots.length === 0) return { kind: "none" }
  slots.sort((a, b) => a - b)
  const takeBack: number[] = []
  const seen: Record<number, boolean> = {}
  for (const slot of stowable) {
    if (chosen[slot] === true || seen[slot] === true) continue
    seen[slot] = true
    takeBack.push(slot)
  }
  if (takeBack.length === 0) return { kind: "stow-all", slots }
  const fits = slots.length + takeBack.length <= vaultFreeSlots
  if (fits && takeBack.length + 1 < slots.length) {
    takeBack.sort((a, b) => a - b)
    return { kind: "stow-all-then-take-back", slots, takeBack }
  }
  return { kind: "moves", slots }
}

interface KeptStack {
  readonly itemLink: string
  readonly count: number
}

interface AimedTakeBack {
  readonly source: number
  readonly target: number
  readonly count: number
}

export function aimTakeBacks(
  this: void,
  kept: readonly KeptStack[],
  vaultSize: number,
  vaultLinkAt: (this: void, slot: number) => string,
  vaultStackAt: (this: void, slot: number) => number,
  backpackSize: number,
  backpackStackAt: (this: void, slot: number) => number
): AimedTakeBack[] {
  const taken: Record<number, number> = {}
  const aimed: AimedTakeBack[] = []
  let target = 0
  for (const one of kept) {
    let source: number | undefined
    for (let slot = 0; slot < vaultSize; slot++) {
      if (vaultLinkAt(slot) !== one.itemLink) continue
      if (vaultStackAt(slot) - (taken[slot] ?? 0) < one.count) continue
      source = slot
      break
    }
    if (source === undefined) continue
    while (target < backpackSize && backpackStackAt(target) > 0) target++
    if (target >= backpackSize) break
    taken[source] = (taken[source] ?? 0) + one.count
    aimed.push({ source, target, count: one.count })
    target++
  }
  return aimed
}

interface AimedVaultDeposit {
  readonly slot: number
  readonly target: number
}

export function aimVaultDeposits(
  this: void,
  slots: readonly number[],
  vaultSize: number,
  vaultStackAt: (this: void, slot: number) => number
): AimedVaultDeposit[] {
  const aimed: AimedVaultDeposit[] = []
  let target = 0
  for (const slot of slots) {
    while (target < vaultSize && vaultStackAt(target) > 0) target++
    if (target >= vaultSize) break
    aimed.push({ slot, target })
    target++
  }
  return aimed
}

export function splitLanded(
  this: void,
  slots: readonly number[],
  stackOf: (this: void, slot: number) => number
): { landed: number[]; left: number[] } {
  const landed: number[] = []
  const left: number[] = []
  for (const slot of slots) {
    if (stackOf(slot) === 0) landed.push(slot)
    else left.push(slot)
  }
  return { landed, left }
}
