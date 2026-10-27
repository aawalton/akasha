import type { ActionDifficulty } from "akasha/story/world/mechanics/checks/action-difficulties/action-difficulty.page-type.types.ts"

export const simple = {
  id: "01a17eed-e5f8-70ad-b99b-b634b8af78cb",
  type: "page-type/action-difficulty",
  slug: "simple",
  title: "Simple",
  description: "Almost anyone manages it; a roll only finds how well.",
  oddsModifier: 40,
  createdAt: "2026-10-27T19:54:42.550Z",
  updatedAt: "2026-10-27T19:54:42.550Z",
} as const satisfies ActionDifficulty
