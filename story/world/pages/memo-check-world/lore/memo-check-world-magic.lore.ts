import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const memoCheckWorldMagic = {
  id: "01a1832d-38c0-750b-a769-2b30c4b8670c",
  type: "page-type/lore",
  slug: "memo-check-world-magic",
  title: "Test Magic",
  world: "world/memo-check-world",
  about: "world/memo-check-world",
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
  createdAt: "2026-10-28T15:42:23.600Z",
  updatedAt: "2026-10-28T15:42:23.600Z",
} as const satisfies Lore
