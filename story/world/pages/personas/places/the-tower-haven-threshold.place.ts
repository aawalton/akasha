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
    "The mouth of the haven, where the exit-stair from the dark shaft gives onto a long, low stone room, cold and unlit. The hearth across it is a dead heap of grey ash, the long table bare boards set for no one, and old climbers' bones lie stacked where the chairs seemed to be. No hooded figure keeps it any longer. Beyond it the rooms run on, cold and bare.",
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
