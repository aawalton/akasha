import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const outcomeCardsCheckWorldMagic = {
  id: "01a17ffe-7d82-74c6-a6ac-b2f66a286d5f",
  type: "page-type/lore",
  slug: "outcome-cards-check-world-magic",
  title: "Test Magic",
  world: "world/outcome-cards-check-world",
  about: "world/outcome-cards-check-world",
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
  createdAt: "2026-10-28T00:52:29.403Z",
  updatedAt: "2026-10-28T00:52:29.403Z",
} as const satisfies Lore
