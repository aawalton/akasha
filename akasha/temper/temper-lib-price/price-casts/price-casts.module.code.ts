import type {
  GlobalTable,
  ItemPriceRecord,
  LibPriceTable,
  NormalizedPrice,
  OptionalNumber,
  RawPrice,
  SourceSet,
} from "../price-types/price-types.module.code.ts"

export function asLibPriceTable(value: unknown): LibPriceTable {
  return value as LibPriceTable
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

export function asNormalizedPrice(value: unknown): NormalizedPrice {
  return value as NormalizedPrice
}
