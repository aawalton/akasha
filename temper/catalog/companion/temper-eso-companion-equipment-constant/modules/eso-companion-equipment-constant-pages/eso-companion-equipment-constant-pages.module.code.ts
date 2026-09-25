import { equipTypeEquipTypeChest } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/pages/equip-type-equip-type-chest.temper-eso-companion-equipment-constant.ts"
import { equipTypeEquipTypeFeet } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/pages/equip-type-equip-type-feet.temper-eso-companion-equipment-constant.ts"
import { equipTypeEquipTypeHand } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/pages/equip-type-equip-type-hand.temper-eso-companion-equipment-constant.ts"
import { equipTypeEquipTypeHead } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/pages/equip-type-equip-type-head.temper-eso-companion-equipment-constant.ts"
import { equipTypeEquipTypeLegs } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/pages/equip-type-equip-type-legs.temper-eso-companion-equipment-constant.ts"
import { equipTypeEquipTypeMainHand } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/pages/equip-type-equip-type-main-hand.temper-eso-companion-equipment-constant.ts"
import { equipTypeEquipTypeNeck } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/pages/equip-type-equip-type-neck.temper-eso-companion-equipment-constant.ts"
import { equipTypeEquipTypeOffHand } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/pages/equip-type-equip-type-off-hand.temper-eso-companion-equipment-constant.ts"
import { equipTypeEquipTypeOneHand } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/pages/equip-type-equip-type-one-hand.temper-eso-companion-equipment-constant.ts"
import { equipTypeEquipTypeRing } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/pages/equip-type-equip-type-ring.temper-eso-companion-equipment-constant.ts"
import { equipTypeEquipTypeShoulders } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/pages/equip-type-equip-type-shoulders.temper-eso-companion-equipment-constant.ts"
import { equipTypeEquipTypeTwoHand } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/pages/equip-type-equip-type-two-hand.temper-eso-companion-equipment-constant.ts"
import { equipTypeEquipTypeWaist } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/pages/equip-type-equip-type-waist.temper-eso-companion-equipment-constant.ts"
import { qualityCompanionToEsoEpic } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/pages/quality-companion-to-eso-epic.temper-eso-companion-equipment-constant.ts"
import { qualityCompanionToEsoFine } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/pages/quality-companion-to-eso-fine.temper-eso-companion-equipment-constant.ts"
import { qualityCompanionToEsoLegendary } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/pages/quality-companion-to-eso-legendary.temper-eso-companion-equipment-constant.ts"
import { qualityCompanionToEsoNoQuality } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/pages/quality-companion-to-eso-no-quality.temper-eso-companion-equipment-constant.ts"
import { qualityCompanionToEsoNormal } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/pages/quality-companion-to-eso-normal.temper-eso-companion-equipment-constant.ts"
import { qualityCompanionToEsoSuperior } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/pages/quality-companion-to-eso-superior.temper-eso-companion-equipment-constant.ts"
import { qualityEsoToCompanion1 } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/pages/quality-eso-to-companion-1.temper-eso-companion-equipment-constant.ts"
import { qualityEsoToCompanion2 } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/pages/quality-eso-to-companion-2.temper-eso-companion-equipment-constant.ts"
import { qualityEsoToCompanion3 } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/pages/quality-eso-to-companion-3.temper-eso-companion-equipment-constant.ts"
import { qualityEsoToCompanion4 } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/pages/quality-eso-to-companion-4.temper-eso-companion-equipment-constant.ts"
import { qualityEsoToCompanion5 } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/pages/quality-eso-to-companion-5.temper-eso-companion-equipment-constant.ts"
import type { TemperEsoCompanionEquipmentConstant } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/temper-eso-companion-equipment-constant.page-type.types.ts"

export const ESO_COMPANION_EQUIPMENT_CONSTANT_PAGES: readonly TemperEsoCompanionEquipmentConstant[] =
  [
    equipTypeEquipTypeHead,
    equipTypeEquipTypeNeck,
    equipTypeEquipTypeChest,
    equipTypeEquipTypeShoulders,
    equipTypeEquipTypeOneHand,
    equipTypeEquipTypeTwoHand,
    equipTypeEquipTypeOffHand,
    equipTypeEquipTypeWaist,
    equipTypeEquipTypeLegs,
    equipTypeEquipTypeFeet,
    equipTypeEquipTypeRing,
    equipTypeEquipTypeHand,
    equipTypeEquipTypeMainHand,
    qualityCompanionToEsoNoQuality,
    qualityCompanionToEsoNormal,
    qualityCompanionToEsoFine,
    qualityCompanionToEsoSuperior,
    qualityCompanionToEsoEpic,
    qualityCompanionToEsoLegendary,
    qualityEsoToCompanion1,
    qualityEsoToCompanion2,
    qualityEsoToCompanion3,
    qualityEsoToCompanion4,
    qualityEsoToCompanion5,
  ]

export function equipTypeNumber(name: string): number {
  for (const one of ESO_COMPANION_EQUIPMENT_CONSTANT_PAGES) {
    if (one.kind === "equip-type" && one.keyText === name && one.valueNum !== undefined) {
      return one.valueNum
    }
  }
  throw new Error(`no companion equipment constant page numbers ${name}`)
}
