import type { ActionDifficulty } from "akasha/story/world/mechanics/checks/action-difficulties/action-difficulty.page-type.types.ts"

export const somewhatHard = {
  id: "01a17eed-e5f9-700e-bffe-c66f5ea4260e",
  type: "page-type/action-difficulty",
  slug: "somewhat-hard",
  title: "Somewhat Hard",
  description: "A trained hand often manages it; an untrained one seldom.",
  oddsModifier: -15,
  createdAt: "2026-10-27T19:54:42.550Z",
  updatedAt: "2026-10-27T19:54:42.550Z",
} as const satisfies ActionDifficulty
