import type { DataFile } from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import type { EquipmentQualityId } from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import { gradedEffectsAt } from "akasha/temper/catalog/gear/equipment/modules/graded-effects/graded-effects.module.code.ts"
import {
  gearTableOf,
  type HeldGearTable,
  heldGearTable,
  inGearOrder,
} from "akasha/temper/catalog/gear/equipment/modules/held-gear-table/held-gear-table.module.code.ts"
import { temperArmorEnchant } from "akasha/temper/catalog/gear/temper-armor-enchant/temper-armor-enchant.page-type.ts"
import { temperJewelryEnchant } from "akasha/temper/catalog/gear/temper-jewelry-enchant/temper-jewelry-enchant.page-type.ts"
import { temperWeaponEnchant } from "akasha/temper/catalog/gear/temper-weapon-enchant/temper-weapon-enchant.page-type.ts"
import type { MetricEffect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"

type EnchantFamily = "armor" | "weapon" | "jewelry"

interface EnchantTemplate<Id extends string = string> {
  readonly id: Id
  readonly name: string
  readonly glyphName: string
  readonly essenceRune: string
  readonly effect: string
  readonly esoEnchantConstantName: string
}

type Row = Readonly<Record<string, unknown>>

type Read = readonly [string, readonly string[]]

const PAGE_TYPES: Readonly<Record<EnchantFamily, string>> = {
  armor: temperArmorEnchant.slug,
  weapon: temperWeaponEnchant.slug,
  jewelry: temperJewelryEnchant.slug,
}

const FAMILIES: readonly EnchantFamily[] = ["armor", "weapon", "jewelry"]

const ENCHANT_FIELDS: readonly string[] = [
  "slug",
  "title",
  "glyphName",
  "essenceRune",
  "effect",
  "esoEnchantConstantName",
  "effects",
  "hashPlace",
]

export const ENCHANT_READS: readonly Read[] = FAMILIES.map(
  (family): Read => [PAGE_TYPES[family], ENCHANT_FIELDS]
)

const TABLES: Readonly<Record<EnchantFamily, HeldGearTable<string, EnchantTemplate>>> = {
  armor: heldGearTable("armor enchants"),
  weapon: heldGearTable("weapon enchants"),
  jewelry: heldGearTable("jewelry enchants"),
}

export function enchantTable<Id extends string>(
  family: EnchantFamily
): DataFile<Id, EnchantTemplate<Id>> {
  return TABLES[family].table as DataFile<Id, EnchantTemplate<Id>>
}

function enchantOf(row: Row): EnchantTemplate {
  return {
    id: String(row.slug),
    name: String(row.title),
    glyphName: typeof row.glyphName === "string" ? row.glyphName : "",
    essenceRune: typeof row.essenceRune === "string" ? row.essenceRune : "",
    effect: typeof row.effect === "string" ? row.effect : "",
    esoEnchantConstantName: String(row.esoEnchantConstantName),
  }
}

export function holdEnchants(rowsOf: (pageTypeSlug: string) => Iterable<Row>): undefined {
  for (const family of FAMILIES) {
    const rows = inGearOrder(rowsOf(PAGE_TYPES[family]), "hashPlace")
    TABLES[family].hold(gearTableOf(rows.map(enchantOf)))
  }
}

export function enchantEffectsAt(
  family: EnchantFamily,
  enchantId: string,
  quality: EquipmentQualityId
): readonly MetricEffect[] {
  return gradedEffectsAt(`${PAGE_TYPES[family]}/${enchantId}`, quality)
}
