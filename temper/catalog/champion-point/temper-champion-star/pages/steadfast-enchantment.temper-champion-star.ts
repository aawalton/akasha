import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const steadfastEnchantment = {
  id: "01a0e13c-001b-7149-bfa4-99336a66dc0e",
  type: "page-type/temper-champion-star",
  slug: "steadfast-enchantment",
  title: "Steadfast Enchantment",
  description: "Your Weapon Enchantments have a 50% chance to not consume a charge when activated",
  esoChampionSkillId: 75,
  championConstellation: "craft",
  isSlottable: false,
  hashPlace: 4,
} as const satisfies TemperChampionStar
