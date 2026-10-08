import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const shieldMaster = {
  id: "01a0e13c-001b-7853-ba9e-255ae0269686",
  type: "page-type/temper-champion-star",
  slug: "shield-master",
  title: "Shield Master",
  description: "Reduces the cost of your damage shield abilities by 10%",
  esoChampionSkillId: 63,
  championConstellation: "fitness",
  isSlottable: true,
  hashPlace: 49,
  createdAt: "2026-09-27T05:00:00.923Z",
  updatedAt: "2026-09-27T05:00:07.000Z",
} as const satisfies TemperChampionStar
