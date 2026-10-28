import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const memoCheckWorldOverview = {
  id: "01a1832d-38c0-7ecd-bfdb-3a566479a248",
  type: "page-type/lore",
  slug: "memo-check-world-overview",
  title: "The Test World",
  world: "world/memo-check-world",
  about: "world/memo-check-world",
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
      knowers: ["lore-disclosure/game-master", "character-player/memo-check-player"],
    },
    {
      fact: "The iron sword's edge runs even from hilt to point, with no nick or rolled spot.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-28T15:42:23.600Z",
  updatedAt: "2026-10-28T15:42:23.600Z",
} as const satisfies Lore
