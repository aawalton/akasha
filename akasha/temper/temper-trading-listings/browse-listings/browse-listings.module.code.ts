export interface BrowseListing<F = unknown> {
  readonly uid: string
  readonly pricePerUnit: number
  readonly totalPrice: number
  readonly guildId: number
  readonly sellerName: string
  readonly facts: F
}

export function mergeListings<F>(
  existing: readonly BrowseListing<F>[],
  incoming: readonly BrowseListing<F>[]
): readonly BrowseListing<F>[] {
  const byUid = new Map<string, BrowseListing<F>>()
  for (const item of existing) byUid.set(item.uid, item)
  for (const item of incoming) byUid.set(item.uid, item)
  return [...byUid.values()]
}

export function sortByUnitPriceAsc<F>(
  listings: readonly BrowseListing<F>[]
): readonly BrowseListing<F>[] {
  return [...listings].sort(comparePrice)
}

export function sortByUnitPriceDesc<F>(
  listings: readonly BrowseListing<F>[]
): readonly BrowseListing<F>[] {
  return [...listings].sort((a, b) => {
    if (a.pricePerUnit < b.pricePerUnit) return 1
    if (a.pricePerUnit > b.pricePerUnit) return -1
    return compareUid(a, b)
  })
}

function comparePrice<F>(a: BrowseListing<F>, b: BrowseListing<F>): number {
  if (a.pricePerUnit < b.pricePerUnit) return -1
  if (a.pricePerUnit > b.pricePerUnit) return 1
  return compareUid(a, b)
}

function compareUid<F>(a: BrowseListing<F>, b: BrowseListing<F>): number {
  if (a.uid < b.uid) return -1
  if (a.uid > b.uid) return 1
  return 0
}
