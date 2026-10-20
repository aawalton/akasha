import type { DataFile } from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import type { EquipmentQualityId } from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import {
  GLYPH_SUBTYPES_BY_GRADE,
  GLYPH_VALUES_BY_GRADE,
  GLYPH_VALUES_BY_SUBTYPE_AND_LEVEL,
} from "akasha/temper/catalog/gear/equipment/modules/glyph-grades/glyph-grades.data-table.code.ts"
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

function enchantEffectsAt(
  family: EnchantFamily,
  enchantId: string,
  quality: EquipmentQualityId
): readonly MetricEffect[] {
  return gradedEffectsAt(`${PAGE_TYPES[family]}/${enchantId}`, quality)
}

const GRADE_BY_SUBTYPE = new Map<number, number>(
  GLYPH_SUBTYPES_BY_GRADE.flatMap((subtypes, grade) => subtypes.map((one) => [one, grade] as const))
)

const LEGENDARY_SUBTYPE = 370

const SUBTYPE_BY_QUALITY: Readonly<Partial<Record<string, number>>> = {
  normal: 366,
  fine: 367,
  superior: 368,
  epic: 369,
  legendary: 370,
}

function glyphNumber(legendary: number, best: readonly number[], now: readonly number[]): number {
  const size = Math.abs(legendary)
  const at = best.indexOf(size)
  const first = best[0]
  const scaled =
    at >= 0
      ? (now[at] ?? size)
      : first !== undefined && first > 0
        ? Math.round((size * (now[0] ?? first)) / first)
        : size
  return Math.sign(legendary) * scaled
}

function leveledGlyph(
  enchant: string,
  subtype: number | undefined,
  level: number | undefined
): readonly number[] | undefined {
  if (subtype === undefined || level === undefined) return undefined
  return GLYPH_VALUES_BY_SUBTYPE_AND_LEVEL[enchant]?.[`${subtype}/${level}`]
}

export function glyphEffectsAt(
  family: EnchantFamily,
  enchantId: string,
  quality: EquipmentQualityId,
  subtype: number | undefined,
  level?: number
): readonly MetricEffect[] {
  const legendary = enchantEffectsAt(family, enchantId, "legendary")
  const enchant = `${family}/${enchantId}`
  const values = GLYPH_VALUES_BY_GRADE[enchant]
  const leveled = leveledGlyph(enchant, subtype, level)
  const at = GRADE_BY_SUBTYPE.get(subtype ?? SUBTYPE_BY_QUALITY[quality] ?? LEGENDARY_SUBTYPE)
  const top = GRADE_BY_SUBTYPE.get(LEGENDARY_SUBTYPE)
  if (values === undefined || top === undefined || (leveled === undefined && at === undefined)) {
    return enchantEffectsAt(family, enchantId, quality)
  }
  const best = values[top] ?? []
  const now = leveled ?? (at === undefined ? [] : (values[at] ?? []))
  return legendary.map((effect) =>
    effect.effectType === "integer"
      ? { ...effect, effectValue: glyphNumber(effect.effectValue, best, now) }
      : effect
  )
}
