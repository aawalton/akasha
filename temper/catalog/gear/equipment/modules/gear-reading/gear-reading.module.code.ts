import { holdArmorSlots } from "akasha/temper/catalog/gear/equipment/kind/modules/armor-slots/armor-slots.module.code.ts"
import { holdArmorTypes } from "akasha/temper/catalog/gear/equipment/kind/modules/armor-types/armor-types.module.code.ts"
import {
  holdQualities,
  qualitiesOf,
} from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import { holdJewelrySlots } from "akasha/temper/catalog/gear/equipment/kind/modules/jewelry-slots/jewelry-slots.module.code.ts"
import { holdWeaponSlots } from "akasha/temper/catalog/gear/equipment/kind/modules/weapon-slots/weapon-slots.module.code.ts"
import {
  ENCHANT_READS,
  holdEnchants,
} from "akasha/temper/catalog/gear/equipment/modules/enchant-reading/enchant-reading.module.code.ts"
import {
  gearTypeNamesOf,
  holdGearTypeNames,
} from "akasha/temper/catalog/gear/equipment/modules/gear-type-names/gear-type-names.module.code.ts"
import { holdGraded } from "akasha/temper/catalog/gear/equipment/modules/graded-effects/graded-effects.module.code.ts"
import { slugOf } from "akasha/temper/catalog/gear/equipment/modules/held-gear-table/held-gear-table.module.code.ts"
import {
  holdTraits,
  TRAIT_READS,
} from "akasha/temper/catalog/gear/equipment/modules/trait-reading/trait-reading.module.code.ts"
import { temperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.ts"
import { temperArmorEnchant } from "akasha/temper/catalog/gear/temper-armor-enchant/temper-armor-enchant.page-type.ts"
import { temperArmorSlot } from "akasha/temper/catalog/gear/temper-armor-slot/temper-armor-slot.page-type.ts"
import { temperArmorTrait } from "akasha/temper/catalog/gear/temper-armor-trait/temper-armor-trait.page-type.ts"
import { temperArmorType } from "akasha/temper/catalog/gear/temper-armor-type/temper-armor-type.page-type.ts"
import { temperArmorWeight } from "akasha/temper/catalog/gear/temper-armor-weight/temper-armor-weight.page-type.ts"
import { temperEquipType } from "akasha/temper/catalog/gear/temper-equip-type/temper-equip-type.page-type.ts"
import { temperJewelryEnchant } from "akasha/temper/catalog/gear/temper-jewelry-enchant/temper-jewelry-enchant.page-type.ts"
import { temperJewelrySlot } from "akasha/temper/catalog/gear/temper-jewelry-slot/temper-jewelry-slot.page-type.ts"
import { temperJewelryTrait } from "akasha/temper/catalog/gear/temper-jewelry-trait/temper-jewelry-trait.page-type.ts"
import { temperJewelryType } from "akasha/temper/catalog/gear/temper-jewelry-type/temper-jewelry-type.page-type.ts"
import { temperLevelBand } from "akasha/temper/catalog/gear/temper-level-band/temper-level-band.page-type.ts"
import { temperQuality } from "akasha/temper/catalog/gear/temper-quality/temper-quality.page-type.ts"
import { temperSetBonusStep } from "akasha/temper/catalog/gear/temper-set-bonus-step/temper-set-bonus-step.page-type.ts"
import { temperWeaponEnchant } from "akasha/temper/catalog/gear/temper-weapon-enchant/temper-weapon-enchant.page-type.ts"
import { temperWeaponSlot } from "akasha/temper/catalog/gear/temper-weapon-slot/temper-weapon-slot.page-type.ts"
import { temperWeaponTrait } from "akasha/temper/catalog/gear/temper-weapon-trait/temper-weapon-trait.page-type.ts"
import { temperWeaponType } from "akasha/temper/catalog/gear/temper-weapon-type/temper-weapon-type.page-type.ts"
import { holdArmorWeights } from "akasha/temper/player/character/characters-equipment/modules/armor-weights/armor-weights.module.code.ts"
import { holdLevelBands } from "akasha/temper/player/character/characters-equipment/modules/level-scaling/level-scaling.module.code.ts"
import { holdSetBonusSteps } from "akasha/temper/player/character/characters-equipment/modules/set-source/set-source.module.code.ts"
import { holdWeaponTypes } from "akasha/temper/player/character/characters-equipment/modules/weapon-types-data/weapon-types-data.module.code.ts"

type Row = Readonly<Record<string, unknown>>

type Read = readonly [string, readonly string[]]

const GRADED: readonly string[] = [
  temperArmorTrait.slug,
  temperWeaponTrait.slug,
  temperJewelryTrait.slug,
  temperArmorEnchant.slug,
  temperWeaponEnchant.slug,
  temperJewelryEnchant.slug,
]

export const GEAR_READS: readonly Read[] = [
  [
    temperQuality.slug,
    [
      "slug",
      "title",
      "available",
      "hashPlace",
      "esoDisplayQuality",
      "armorLevelScale",
      "weaponLevelScale",
      "setBonusScale",
    ],
  ],
  [temperSetBonusStep.slug, ["slug", "setBonusScale"]],
  [temperArmorSlot.slug, ["slug", "title", "icon", "hashPlace", "slotEquipType"]],
  [temperArmorType.slug, ["slug", "title", "armorMultiplier", "enchantmentMultiplier"]],
  [temperJewelrySlot.slug, ["slug", "title", "icon", "jewelryType", "hashPlace"]],
  [temperJewelryType.slug, ["slug", "title", "slotEquipType"]],
  [temperEquipType.slug, ["slug", "title", "equipType"]],
  [
    temperLevelBand.slug,
    [
      "slug",
      "levelBandPrefix",
      "levelBandBottom",
      "levelBandTop",
      "worthLevelStart",
      "worthLevelSpan",
    ],
  ],
  [temperWeaponSlot.slug, ["slug", "title", "icon", "displayOrder", "slotEquipType"]],
  [
    temperArmorWeight.slug,
    [
      "slug",
      "title",
      "baseValue",
      "isStandard",
      "skillLineId",
      "hashPlace",
      "armorType",
      "esoWeaponTypeNumber",
      "levelSlope",
      "levelIntercept",
    ],
  ],
  [temperGearGrade.slug, ["slug", "thing", "quality", "metric", "value", "rawValue"]],
  ...TRAIT_READS,
  ...ENCHANT_READS,
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
      "esoWeaponTypeNumber",
      "levelSlope",
      "levelIntercept",
    ],
  ],
]

function equipTypeNumbers(rows: Iterable<Row>): ReadonlyMap<string, number> {
  const numbers = new Map<string, number>()
  for (const row of rows) {
    if (typeof row.equipType === "number") numbers.set(String(row.slug), row.equipType)
  }
  return numbers
}

function jewelryEquipTypes(
  rows: Iterable<Row>,
  equipTypes: ReadonlyMap<string, number>
): ReadonlyMap<string, number> {
  const numbers = new Map<string, number>()
  for (const row of rows) {
    const found = equipTypes.get(slugOf(row.slotEquipType))
    if (found !== undefined) numbers.set(String(row.slug), found)
  }
  return numbers
}

export function holdGear(rowsOf: (pageTypeSlug: string) => Iterable<Row>): undefined {
  const equipTypes = equipTypeNumbers(rowsOf(temperEquipType.slug))
  holdQualities(qualitiesOf(rowsOf(temperQuality.slug)))
  holdArmorSlots(rowsOf(temperArmorSlot.slug), equipTypes)
  holdArmorTypes(rowsOf(temperArmorType.slug))
  holdJewelrySlots(
    rowsOf(temperJewelrySlot.slug),
    jewelryEquipTypes(rowsOf(temperJewelryType.slug), equipTypes)
  )
  holdWeaponSlots(rowsOf(temperWeaponSlot.slug))
  holdLevelBands(rowsOf(temperLevelBand.slug))
  holdSetBonusSteps(rowsOf(temperSetBonusStep.slug))
  holdArmorWeights(rowsOf(temperArmorWeight.slug), rowsOf(temperGearGrade.slug))
  holdWeaponTypes(rowsOf(temperWeaponType.slug), rowsOf(temperGearGrade.slug))
  holdTraits(rowsOf)
  holdEnchants(rowsOf)
  holdGraded(rowsOf, GRADED)
  holdGearTypeNames(
    gearTypeNamesOf({
      equipTypes: rowsOf(temperEquipType.slug),
      weaponTypes: rowsOf(temperWeaponType.slug),
      armorWeights: rowsOf(temperArmorWeight.slug),
    })
  )
}
