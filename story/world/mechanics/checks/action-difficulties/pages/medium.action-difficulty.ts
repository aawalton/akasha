import type { ActionDifficulty } from "akasha/story/world/mechanics/checks/action-difficulties/action-difficulty.page-type.types.ts"

export const medium = {
  id: "01a17eed-e5f8-7d5b-ae3c-bf27e1737baf",
  type: "page-type/action-difficulty",
  slug: "medium",
  title: "Medium",
  description: "A trained hand usually manages it; an untrained one half the time.",
  oddsModifier: 0,
  createdAt: "2026-10-27T19:54:42.550Z",
  updatedAt: "2026-10-27T19:54:42.550Z",
} as const satisfies ActionDifficulty
