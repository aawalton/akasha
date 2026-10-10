export type VaultDepositPlan =
  | { readonly kind: "none" }
  | { readonly kind: "stow-all"; readonly slots: number[] }
  | { readonly kind: "moves"; readonly slots: number[] }

export function planVaultDeposit(
  this: void,
  pending: readonly number[],
  stowable: readonly number[]
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
  for (const slot of stowable) {
    if (chosen[slot] !== true) return { kind: "moves", slots }
  }
  return { kind: "stow-all", slots }
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
