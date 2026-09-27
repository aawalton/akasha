import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const expertEvasion = {
  id: "01a0e13c-001a-7911-bc10-116ef10a3f1b",
  type: "page-type/temper-champion-star",
  slug: "expert-evasion",
  title: "Expert Evasion",
  description:
    "Your next Roll Dodge is free of cost. After consuming this effect, you cannot gain it again for 30 seconds",
  esoChampionSkillId: 51,
  championConstellation: "fitness",
  isSlottable: true,
  hashPlace: 65,
} as const satisfies TemperChampionStar
