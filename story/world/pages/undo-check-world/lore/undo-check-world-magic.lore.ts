import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const undoCheckWorldMagic = {
  id: "01a18309-e114-7215-a659-ad791f192da4",
  type: "page-type/lore",
  slug: "undo-check-world-magic",
  title: "Test Magic",
  world: "world/undo-check-world",
  about: "world/undo-check-world",
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
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:03:47.724Z",
} as const satisfies Lore
