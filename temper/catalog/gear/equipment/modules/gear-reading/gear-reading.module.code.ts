import {
  holdQualities,
  qualitiesOf,
} from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import { temperQuality } from "akasha/temper/catalog/gear/temper-quality/temper-quality.page-type.ts"

type Row = Readonly<Record<string, unknown>>

type Read = readonly [string, readonly string[]]

export const GEAR_READS: readonly Read[] = [
  [temperQuality.slug, ["slug", "title", "available", "hashPlace"]],
]

export function holdGear(rowsOf: (pageTypeSlug: string) => Iterable<Row>): undefined {
  holdQualities(qualitiesOf(rowsOf(temperQuality.slug)))
}
