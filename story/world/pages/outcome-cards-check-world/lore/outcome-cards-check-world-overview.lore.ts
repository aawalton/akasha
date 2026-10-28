import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const outcomeCardsCheckWorldOverview = {
  id: "01a17ffe-7d82-7648-babe-74807eb45a83",
  type: "page-type/lore",
  slug: "outcome-cards-check-world-overview",
  title: "The Test World",
  world: "world/outcome-cards-check-world",
  about: "world/outcome-cards-check-world",
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
      knowers: ["lore-disclosure/game-master", "character-player/outcome-cards-check-player"],
    },
    {
      fact: "The iron sword's edge runs even from hilt to point, with no nick or rolled spot.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-28T00:52:29.403Z",
  updatedAt: "2026-10-28T00:52:29.403Z",
} as const satisfies Lore
