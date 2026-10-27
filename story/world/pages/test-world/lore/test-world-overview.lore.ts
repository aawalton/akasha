import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const testWorldOverview = {
  id: "01a17ec5-127b-73a8-816f-db2d2a379d02",
  type: "page-type/lore",
  slug: "test-world-overview",
  title: "The Test World",
  world: "world/test-world",
  about: "world/test-world",
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
      knowers: [
        "lore-disclosure/game-master",
        "character-player/test-story-player",
        "character-player/beat-flow-test-player",
      ],
    },
    {
      fact: "The iron sword's edge runs even from hilt to point, with no nick or rolled spot.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-27T19:10:06.969Z",
  updatedAt: "2026-10-27T23:24:42.204Z",
} as const satisfies Lore
