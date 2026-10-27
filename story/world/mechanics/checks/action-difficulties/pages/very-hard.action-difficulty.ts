import type { ActionDifficulty } from "akasha/story/world/mechanics/checks/action-difficulties/action-difficulty.page-type.types.ts"

export const veryHard = {
  id: "01a17eed-e5f9-79cf-8b63-e2188a080ab1",
  type: "page-type/action-difficulty",
  slug: "very-hard",
  title: "Very Hard",
  description: "A strong hand seldom manages it.",
  oddsModifier: -45,
  createdAt: "2026-10-27T19:54:42.550Z",
  updatedAt: "2026-10-27T19:54:42.550Z",
} as const satisfies ActionDifficulty
