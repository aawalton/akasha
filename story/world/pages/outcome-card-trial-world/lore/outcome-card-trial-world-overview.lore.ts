import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const outcomeCardTrialWorldOverview = {
  id: "01a183ae-dc71-7e71-af54-6ab5914d1578",
  type: "page-type/lore",
  slug: "outcome-card-trial-world-overview",
  title: "The Test World",
  world: "world/outcome-card-trial-world",
  about: "world/outcome-card-trial-world",
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
      knowers: ["lore-disclosure/game-master", "character-player/outcome-card-trial-player"],
    },
    {
      fact: "The iron sword's edge runs even from hilt to point, with no nick or rolled spot.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-28T18:03:59.696Z",
  updatedAt: "2026-10-28T18:03:59.696Z",
} as const satisfies Lore
