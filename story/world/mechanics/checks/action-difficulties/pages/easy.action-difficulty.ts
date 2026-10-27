import type { ActionDifficulty } from "akasha/story/world/mechanics/checks/action-difficulties/action-difficulty.page-type.types.ts"

export const easy = {
  id: "01a17eed-e5f7-772f-838b-6514084eb287",
  type: "page-type/action-difficulty",
  slug: "easy",
  title: "Easy",
  description: "An untrained hand usually manages it.",
  oddsModifier: 20,
  createdAt: "2026-10-27T19:54:42.550Z",
  updatedAt: "2026-10-27T19:54:42.550Z",
} as const satisfies ActionDifficulty
