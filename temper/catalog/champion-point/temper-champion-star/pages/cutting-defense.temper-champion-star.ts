import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const cuttingDefense = {
  id: "01a0e13c-001a-73e8-a8f2-f2496f363a15",
  type: "page-type/temper-champion-star",
  slug: "cutting-defense",
  title: "Cutting Defense",
  description:
    "You deal 0 Magic Damage to attackers whenever they damage you with a direct damage attack within 7 meters. This effect scales off the higher of your Physical or Spell Resistance and can activate your Weapon Enchantments and Poisons",
  esoChampionSkillId: 33,
  championConstellation: "warfare",
  isSlottable: true,
  hashPlace: 117,
} as const satisfies TemperChampionStar
