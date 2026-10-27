import type { ActionDifficulty } from "akasha/story/world/mechanics/checks/action-difficulties/action-difficulty.page-type.types.ts"

export const extremelyHard = {
  id: "01a17eed-e5f8-7187-8193-6330e337a562",
  type: "page-type/action-difficulty",
  slug: "extremely-hard",
  title: "Extremely Hard",
  description: "Only a master, with the moment on their side, has a fair chance.",
  oddsModifier: -60,
  createdAt: "2026-10-27T19:54:42.550Z",
  updatedAt: "2026-10-27T19:54:42.550Z",
} as const satisfies ActionDifficulty
