import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const occultOverload = {
  id: "01a0e13c-001b-746f-9660-f849e3fc6731",
  type: "page-type/temper-champion-star",
  slug: "occult-overload",
  title: "Occult Overload",
  description:
    "Whenever you kill an enemy under the effect of a status effect, they violently explode for 5185 Oblivion Damage to all other enemies in a 4 meter radius, and applying a random status effect to each enemy hit. This effect can occur once every second",
  esoChampionSkillId: 32,
  championConstellation: "warfare",
  isSlottable: true,
  hashPlace: 108,
} as const satisfies TemperChampionStar
