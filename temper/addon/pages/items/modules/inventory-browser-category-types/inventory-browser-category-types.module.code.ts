export interface CategoryTypesRow {
  readonly match?: string
  readonly itemTypes?: readonly string[]
  readonly specializedItemTypes?: readonly string[]
  readonly weaponTypes?: readonly string[]
  readonly armorWeights?: readonly string[]
  readonly equipTypes?: readonly string[]
}

type NumberByAddress = Readonly<Record<string, number>>

export interface CategoryNumbers {
  readonly itemTypes: NumberByAddress
  readonly specializedItemTypes: NumberByAddress
  readonly weaponTypes: NumberByAddress
  readonly armorTypes: NumberByAddress
  readonly armorWeaponTypes: NumberByAddress
  readonly equipTypes: NumberByAddress
}

const ARMOR = "Armor"

export function numberByAddress<T extends { readonly slug: string }>(
  pageType: string,
  rows: readonly T[],
  numberOf: (this: void, row: T) => number | undefined
): NumberByAddress {
  const found: Record<string, number> = {}
  for (const row of rows) {
    const value = numberOf(row)
    if (value !== undefined) found[`${pageType}/${row.slug}`] = value
  }
  return found
}

function putAll(
  into: number[],
  addresses: readonly string[] | undefined,
  numbers: NumberByAddress
): undefined {
  if (addresses === undefined) return undefined
  for (const address of addresses) {
    const value = numbers[address]
    if (value !== undefined) into.push(value)
  }
  return undefined
}

export function categoryTypes(row: CategoryTypesRow, numbers: CategoryNumbers): number[] {
  const types: number[] = []
  putAll(types, row.itemTypes, numbers.itemTypes)
  if (row.match === ARMOR) {
    putAll(types, row.armorWeights, numbers.armorTypes)
  } else {
    putAll(types, row.weaponTypes, numbers.weaponTypes)
    putAll(types, row.armorWeights, numbers.armorWeaponTypes)
  }
  putAll(types, row.equipTypes, numbers.equipTypes)
  putAll(types, row.specializedItemTypes, numbers.specializedItemTypes)
  return types
}
