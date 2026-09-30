import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const overwhereIvGuard = {
  id: "01a0f17e-d5d3-78e3-a9e7-6f1edffbae16",
  type: "page-type/world-class",
  slug: "overwhere-iv-guard",
  title: "Guard",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "A basic class for those who keep watch over a town, a gate or a lord.",
} as const satisfies WorldClass
