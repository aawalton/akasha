import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const pathsSheetCheckWorldMagic = {
  id: "01a182db-5bf2-7475-ab1f-5eed6fc5fe8b",
  type: "page-type/lore",
  slug: "paths-sheet-check-world-magic",
  title: "Test Magic",
  world: "world/paths-sheet-check-world",
  about: "world/paths-sheet-check-world",
  facts: [
    {
      fact: "Magic in the Test World is drawn from mana, which comes back with rest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A spark is the simplest spell: a small flash of light and heat from the fingertips.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A healing draught tastes sweet, with a faint edge of metal under the sweetness.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Drinking a healing draught spreads warmth through the chest.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-28T14:12:58.526Z",
  updatedAt: "2026-10-28T14:12:58.526Z",
} as const satisfies Lore
