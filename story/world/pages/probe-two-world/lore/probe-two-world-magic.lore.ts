import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const probeTwoWorldMagic = {
  id: "01a17fbf-aff5-7a2b-b2b4-65630c750cd7",
  type: "page-type/lore",
  slug: "probe-two-world-magic",
  title: "Test Magic",
  world: "world/probe-two-world",
  about: "world/probe-two-world",
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
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies Lore
