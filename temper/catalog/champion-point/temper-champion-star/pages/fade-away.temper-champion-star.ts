import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const fadeAway = {
  id: "01a0e13c-001a-723c-87ef-ce8ac79d0de5",
  type: "page-type/temper-champion-star",
  slug: "fade-away",
  title: "Fade Away",
  description: "Escaping from a Guard wipes 25% of your current Heat, but not Bounty",
  esoChampionSkillId: 84,
  championConstellation: "craft",
  isSlottable: true,
  hashPlace: 22,
} as const satisfies TemperChampionStar
