export function planFilletMessage<T extends { readonly quantity: number }>(
  this: void,
  targets: readonly T[],
  maxItems: number,
  maxFish: number
): T[] {
  const chosen: T[] = []
  let fish = 0
  for (const t of targets) {
    if (chosen.length >= maxItems) break
    if (t.quantity <= 0) continue
    if (chosen.length > 0 && fish + t.quantity > maxFish) break
    chosen.push(t)
    fish += t.quantity
  }
  return chosen
}
