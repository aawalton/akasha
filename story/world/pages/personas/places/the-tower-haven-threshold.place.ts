import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theTowerHavenThreshold = {
  id: "01a0d440-dde5-7a3b-a74d-fed6a7ca96a4",
  type: "page-type/place",
  slug: "the-tower-haven-threshold",
  title: "The Threshold",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/player",
  within: "place/the-tower-floor-05",
  depth: 5,
  description:
    "The mouth of the haven, where the exit-stair from the dark shaft gives onto warm gold light. From here — without stepping in — you can see the near length of the long room: the laid table, the banked hearth across it, soft furniture along the warm wall, the hooded figure rising by the fire. Beyond it the haven continues — a second warmer hall, and more past that, the gold light receding back further than seems possible for a single floor. It is everything floor four was not: warm, lit, safe, kind. That is exactly the problem, if you let yourself think it.",
  exits: [
    {
      to: "place/the-tower-shaft-headworks",
      way: "back DOWN to floor 4's headworks (open — retreat possible)",
    },
    { to: "place/the-tower-hall-of-welcome", way: "FORWARD into the Hall of Welcome" },
  ],
  facts: [
    "The False Haven's gold light is sourceless and gives no heat.",
    "Real things in the False Haven's gold light cast shadows; woven images do not.",
    "Only real fire gives true light in the False Haven.",
    "The Threshold's laid meal and ewer are illusion and give no real sustenance.",
  ],
} as const satisfies Place
