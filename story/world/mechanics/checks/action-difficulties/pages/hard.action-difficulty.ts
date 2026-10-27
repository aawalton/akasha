import type { ActionDifficulty } from "akasha/story/world/mechanics/checks/action-difficulties/action-difficulty.page-type.types.ts"

export const hard = {
  id: "01a17eed-e5f8-7b79-8df9-dd64de1c24ec",
  type: "page-type/action-difficulty",
  slug: "hard",
  title: "Hard",
  description: "A strong hand manages it about half the time.",
  oddsModifier: -30,
  createdAt: "2026-10-27T19:54:42.550Z",
  updatedAt: "2026-10-27T19:54:42.550Z",
} as const satisfies ActionDifficulty
