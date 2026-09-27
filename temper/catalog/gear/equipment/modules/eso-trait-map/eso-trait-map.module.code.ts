import { companionTraitOfEso } from "akasha/temper/catalog/companion/companions-core/modules/companion-traits/companion-traits.module.code.ts"
import {
  isJewelryEquipType,
  traitOfEsoNumber,
} from "akasha/temper/catalog/gear/equipment/modules/trait-reading/trait-reading.module.code.ts"
import {
  type EsoTraitLookups,
  esoTraitToTemperId,
} from "akasha/temper/items/core/modules/eso-trait-reverse-map/eso-trait-reverse-map.module.code.ts"

const HELD_LOOKUPS: EsoTraitLookups = {
  player: traitOfEsoNumber,
  companion: companionTraitOfEso,
  isJewelry: isJewelryEquipType,
}

export function heldTraitOfEso(esoTraitType: number, equipType?: number): string | undefined {
  return esoTraitToTemperId(HELD_LOOKUPS, esoTraitType, equipType)
}
