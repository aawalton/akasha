import { generateTemperArmorEnchant } from "akasha/temper/addon-generators/temper-armor-enchant/temper-armor-enchant.module.code.ts"
import { generateTemperArmorTrait } from "akasha/temper/addon-generators/temper-armor-trait/temper-armor-trait.module.code.ts"
import { generateTemperArmorWeight } from "akasha/temper/addon-generators/temper-armor-weight/temper-armor-weight.module.code.ts"
import { generateTemperEsoCompanionEquipmentConstant } from "akasha/temper/addon-generators/temper-eso-companion-equipment-constant/temper-eso-companion-equipment-constant.module.code.ts"
import { generateTemperEsoPlayerEquipmentConstant } from "akasha/temper/addon-generators/temper-eso-player-equipment-constant/temper-eso-player-equipment-constant.module.code.ts"
import { generateTemperEsoTraitMap } from "akasha/temper/addon-generators/temper-eso-trait-map/temper-eso-trait-map.module.code.ts"
import { generateTemperJewelryEnchant } from "akasha/temper/addon-generators/temper-jewelry-enchant/temper-jewelry-enchant.module.code.ts"
import { generateTemperJewelryTrait } from "akasha/temper/addon-generators/temper-jewelry-trait/temper-jewelry-trait.module.code.ts"
import { generateTemperWeaponEnchant } from "akasha/temper/addon-generators/temper-weapon-enchant/temper-weapon-enchant.module.code.ts"
import { generateTemperWeaponTrait } from "akasha/temper/addon-generators/temper-weapon-trait/temper-weapon-trait.module.code.ts"
import { generateTemperWeaponType } from "akasha/temper/addon-generators/temper-weapon-type/temper-weapon-type.module.code.ts"
import {
  TEMPER_EQUIPMENT_ARMOR_OUTPUT_DIR,
  TEMPER_EQUIPMENT_ENCHANTS_OUTPUT_DIR,
  TEMPER_EQUIPMENT_TRAITS_OUTPUT_DIR,
  TEMPER_EQUIPMENT_WEAPON_OUTPUT_DIR,
  TEMPER_INVENTORY_CORE_OUTPUT_DIR,
} from "../addon-data-output-dirs/addon-data-output-dirs.module.code.ts"
import type { AddonDataPages } from "../addon-data-pages/addon-data-pages.module.code.ts"

export function buildAddonDataWritesEquipment(
  p: AddonDataPages,
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    w(
      TEMPER_EQUIPMENT_ENCHANTS_OUTPUT_DIR,
      "temper-armor-enchant.generated.ts",
      generateTemperArmorEnchant(p.armorEnchantPages.rows)
    ),
    w(
      TEMPER_EQUIPMENT_TRAITS_OUTPUT_DIR,
      "temper-armor-trait.generated.ts",
      generateTemperArmorTrait(p.armorTraitPages.rows)
    ),
    w(
      TEMPER_EQUIPMENT_ARMOR_OUTPUT_DIR,
      "temper-armor-weight.generated.ts",
      generateTemperArmorWeight(p.armorWeightPages.rows)
    ),
    w(
      TEMPER_INVENTORY_CORE_OUTPUT_DIR,
      "temper-eso-companion-equipment-constant.generated.ts",
      generateTemperEsoCompanionEquipmentConstant(p.esoCompanionEquipmentConstantPages.rows)
    ),
    w(
      TEMPER_INVENTORY_CORE_OUTPUT_DIR,
      "temper-eso-player-equipment-constant.generated.ts",
      generateTemperEsoPlayerEquipmentConstant(p.esoPlayerEquipmentConstantPages.rows)
    ),
    w(
      TEMPER_EQUIPMENT_TRAITS_OUTPUT_DIR,
      "temper-eso-trait-map.generated.ts",
      generateTemperEsoTraitMap(p.esoTraitMapPages.rows)
    ),
    w(
      TEMPER_EQUIPMENT_ENCHANTS_OUTPUT_DIR,
      "temper-jewelry-enchant.generated.ts",
      generateTemperJewelryEnchant(p.jewelryEnchantPages.rows)
    ),
    w(
      TEMPER_EQUIPMENT_TRAITS_OUTPUT_DIR,
      "temper-jewelry-trait.generated.ts",
      generateTemperJewelryTrait(p.jewelryTraitPages.rows)
    ),
    w(
      TEMPER_EQUIPMENT_WEAPON_OUTPUT_DIR,
      "temper-weapon-type.generated.ts",
      generateTemperWeaponType(p.weaponTypePages.rows)
    ),
    w(
      TEMPER_EQUIPMENT_TRAITS_OUTPUT_DIR,
      "temper-weapon-trait.generated.ts",
      generateTemperWeaponTrait(p.weaponTraitPages.rows)
    ),
    w(
      TEMPER_EQUIPMENT_ENCHANTS_OUTPUT_DIR,
      "temper-weapon-enchant.generated.ts",
      generateTemperWeaponEnchant(p.weaponEnchantPages.rows)
    ),
  ]
}
