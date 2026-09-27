import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const warMount = {
  id: "01a0e13c-001c-70f1-b0e6-f858d5e2d09e",
  type: "page-type/temper-champion-star",
  slug: "war-mount",
  title: "War Mount",
  description:
    "Improves your mastery with mounts, removing all mount Stamina costs outside of combat",
  esoChampionSkillId: 82,
  championConstellation: "craft",
  isSlottable: true,
  hashPlace: 27,
} as const satisfies TemperChampionStar
