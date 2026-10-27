import type { ActionDifficulty } from "akasha/story/world/mechanics/checks/action-difficulties/action-difficulty.page-type.types.ts"

export const impossible = {
  id: "01a17eed-e5f8-7f40-b78b-d22a63a105a9",
  type: "page-type/action-difficulty",
  slug: "impossible",
  title: "Impossible",
  description: "No one could do it; it fails whatever the dice say.",
  createdAt: "2026-10-27T19:54:42.550Z",
  updatedAt: "2026-10-27T19:54:42.550Z",
} as const satisfies ActionDifficulty
