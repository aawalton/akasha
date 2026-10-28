import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const undoCheckWorldOverview = {
  id: "01a18309-e114-704f-84df-ddb4bf0814ae",
  type: "page-type/lore",
  slug: "undo-check-world-overview",
  title: "The Test World",
  world: "world/undo-check-world",
  about: "world/undo-check-world",
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
      knowers: ["lore-disclosure/game-master", "character-player/undo-check-player"],
    },
    {
      fact: "The iron sword's edge runs even from hilt to point, with no nick or rolled spot.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:03:47.724Z",
} as const satisfies Lore
