import type {
  GlobalTable,
  ItemPriceRecord,
  OptionalNumber,
  PriceTable,
  RawPrice,
  SourceSet,
} from "akasha/temper/addon/pages/items/crafting-station/modules/price-types/price-types.module.code.ts"

export function asPriceTable(value: unknown): PriceTable {
  return value as PriceTable
}

export function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}

export function asRawPrice(value: unknown): RawPrice {
  return value as RawPrice
}

export function asNumber(value: unknown): number {
  return value as number
}

export function asString(value: unknown): string {
  return value as string
}

export function asOptionalNumber(value: unknown): OptionalNumber {
  return value as OptionalNumber
}

export function asSourceSet(value: SourceSet | string[]): SourceSet {
  return value as SourceSet
}

export function asItemPriceRecord(value: unknown): ItemPriceRecord {
  return value as ItemPriceRecord
}
