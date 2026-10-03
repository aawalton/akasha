import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const breathOfTheWildCryonis = {
  id: "01a10331-b562-78fa-980c-409a812cfbf5",
  type: "page-type/world-mechanic",
  slug: "breath-of-the-wild-cryonis",
  title: "Cryonis",
  world: "world/hyrule",
  description:
    "A Sheikah Slate rune that raises a pillar of ice from a water surface, three at most at once.",
  unrevealed: false,
} as const satisfies WorldMechanic
