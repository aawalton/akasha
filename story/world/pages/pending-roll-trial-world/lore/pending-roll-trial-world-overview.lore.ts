import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const pendingRollTrialWorldOverview = {
  id: "01a183cf-b828-7ab2-bff0-8a3c97bbe3aa",
  type: "page-type/lore",
  slug: "pending-roll-trial-world-overview",
  title: "The Test World",
  world: "world/pending-roll-trial-world",
  about: "world/pending-roll-trial-world",
  facts: [
    {
      fact: "The Test World is one small town of four places, built to try the engine on.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Every name in the Test World says plainly what the thing is.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A healing draught's red liquid tastes of iron and honey.",
      knowers: ["lore-disclosure/game-master", "character-player/pending-roll-trial-player"],
    },
    {
      fact: "The iron sword's edge runs even from hilt to point, with no nick or rolled spot.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-28T18:39:53.794Z",
  updatedAt: "2026-10-28T18:39:53.794Z",
} as const satisfies Lore
