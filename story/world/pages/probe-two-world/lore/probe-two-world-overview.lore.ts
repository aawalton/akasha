import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const probeTwoWorldOverview = {
  id: "01a17fbf-aff5-7ea4-9ca8-26962032227d",
  type: "page-type/lore",
  slug: "probe-two-world-overview",
  title: "The Test World",
  world: "world/probe-two-world",
  about: "world/probe-two-world",
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
      knowers: ["lore-disclosure/game-master", "character-player/probe-two-player"],
    },
    {
      fact: "The iron sword's edge runs even from hilt to point, with no nick or rolled spot.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies Lore
