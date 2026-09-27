import type { ArmorTypeId as ArmorTypePageSlug } from "akasha/temper/catalog/gear/equipment/kind/modules/gear-kind-ids/gear-kind-ids.data-table.code.ts"
import {
  gearTableOf,
  heldGearTable,
} from "akasha/temper/catalog/gear/equipment/modules/held-gear-table/held-gear-table.module.code.ts"

interface ArmorTypeTemplate {
  readonly id: ArmorTypeId
  readonly name: string
  readonly armorMultiplier: number
  readonly enchantmentMultiplier: number
}

type Row = Readonly<Record<string, unknown>>

export type ArmorTypeId = ArmorTypePageSlug

export type StandardArmorType = Exclude<ArmorTypeId, "shield">

const held = heldGearTable<ArmorTypeId, ArmorTypeTemplate>("armor types")

export const armorTypes = held.table

function typeOf(row: Row): ArmorTypeTemplate {
  return {
    id: String(row.slug) as ArmorTypeId,
    name: String(row.title),
    armorMultiplier: Number(row.armorMultiplier),
    enchantmentMultiplier: Number(row.enchantmentMultiplier),
  }
}

export function holdArmorTypes(pages: Iterable<Row>): undefined {
  held.hold(gearTableOf([...pages].map(typeOf)))
  return undefined
}

export function armorEnchantShare(slot: ArmorTypeId): number {
  return armorTypes.data[slot].enchantmentMultiplier
}

export function getArmorMultiplier(slot: ArmorTypeId): number {
  return armorTypes.data[slot].armorMultiplier
}
