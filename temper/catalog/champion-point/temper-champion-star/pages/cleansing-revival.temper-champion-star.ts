import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const cleansingRevival = {
  id: "01a0e13c-001a-73fd-be4a-1eb267c12ef5",
  type: "page-type/temper-champion-star",
  slug: "cleansing-revival",
  title: "Cleansing Revival",
  description:
    "Healing a target under 25% Health removes all harmful effects from them. This effect can occur once every 24 seconds",
  esoChampionSkillId: 29,
  championConstellation: "warfare",
  isSlottable: true,
  hashPlace: 96,
} as const satisfies TemperChampionStar
