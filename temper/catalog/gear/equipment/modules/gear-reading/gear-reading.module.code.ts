import { holdArmorSlots } from "akasha/temper/catalog/gear/equipment/kind/modules/armor-slots/armor-slots.module.code.ts"
import {
  holdQualities,
  qualitiesOf,
} from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import { holdJewelrySlots } from "akasha/temper/catalog/gear/equipment/kind/modules/jewelry-slots/jewelry-slots.module.code.ts"
import { holdWeaponSlots } from "akasha/temper/catalog/gear/equipment/kind/modules/weapon-slots/weapon-slots.module.code.ts"
import { temperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.ts"
import { temperArmorSlot } from "akasha/temper/catalog/gear/temper-armor-slot/temper-armor-slot.page-type.ts"
import { temperArmorWeight } from "akasha/temper/catalog/gear/temper-armor-weight/temper-armor-weight.page-type.ts"
import { temperJewelrySlot } from "akasha/temper/catalog/gear/temper-jewelry-slot/temper-jewelry-slot.page-type.ts"
import { temperQuality } from "akasha/temper/catalog/gear/temper-quality/temper-quality.page-type.ts"
import { temperWeaponSlot } from "akasha/temper/catalog/gear/temper-weapon-slot/temper-weapon-slot.page-type.ts"
import { temperWeaponType } from "akasha/temper/catalog/gear/temper-weapon-type/temper-weapon-type.page-type.ts"
import { holdArmorWeights } from "akasha/temper/player/character/characters-equipment/modules/armor-weights/armor-weights.module.code.ts"
import { holdWeaponTypes } from "akasha/temper/player/character/characters-equipment/modules/weapon-types-data/weapon-types-data.module.code.ts"

type Row = Readonly<Record<string, unknown>>

type Read = readonly [string, readonly string[]]

export const GEAR_READS: readonly Read[] = [
  [temperQuality.slug, ["slug", "title", "available", "hashPlace", "esoDisplayQuality"]],
  [temperArmorSlot.slug, ["slug", "title", "icon", "hashPlace"]],
  [temperJewelrySlot.slug, ["slug", "title", "icon", "jewelryType", "hashPlace"]],
  [temperWeaponSlot.slug, ["slug", "title", "icon", "displayOrder"]],
  [
    temperArmorWeight.slug,
    ["slug", "title", "baseValue", "isStandard", "skillLineId", "hashPlace"],
  ],
  [temperGearGrade.slug, ["slug", "thing", "quality", "metric", "value"]],
  [
    temperWeaponType.slug,
    [
      "slug",
      "title",
      "esoWeaponType",
      "validSlots",
      "weaponPower",
      "isTwoHanded",
      "enchantmentMultiplier",
      "skillLineId",
      "hashPlace",
    ],
  ],
]

export function holdGear(rowsOf: (pageTypeSlug: string) => Iterable<Row>): undefined {
  holdQualities(qualitiesOf(rowsOf(temperQuality.slug)))
  holdArmorSlots(rowsOf(temperArmorSlot.slug))
  holdJewelrySlots(rowsOf(temperJewelrySlot.slug))
  holdWeaponSlots(rowsOf(temperWeaponSlot.slug))
  holdArmorWeights(rowsOf(temperArmorWeight.slug), rowsOf(temperGearGrade.slug))
  holdWeaponTypes(rowsOf(temperWeaponType.slug), rowsOf(temperGearGrade.slug))
}
