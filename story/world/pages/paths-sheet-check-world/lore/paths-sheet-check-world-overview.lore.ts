import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const pathsSheetCheckWorldOverview = {
  id: "01a182db-5bf2-7372-9216-a1d5946f7ec0",
  type: "page-type/lore",
  slug: "paths-sheet-check-world-overview",
  title: "The Test World",
  world: "world/paths-sheet-check-world",
  about: "world/paths-sheet-check-world",
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
      knowers: ["lore-disclosure/game-master", "character-player/paths-sheet-check-player"],
    },
    {
      fact: "The iron sword's edge runs even from hilt to point, with no nick or rolled spot.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-28T14:12:58.526Z",
  updatedAt: "2026-10-28T14:12:58.526Z",
} as const satisfies Lore
