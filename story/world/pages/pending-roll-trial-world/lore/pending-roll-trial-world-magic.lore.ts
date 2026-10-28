import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const pendingRollTrialWorldMagic = {
  id: "01a183cf-b828-7358-b888-7b37882e0350",
  type: "page-type/lore",
  slug: "pending-roll-trial-world-magic",
  title: "Test Magic",
  world: "world/pending-roll-trial-world",
  about: "world/pending-roll-trial-world",
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
  createdAt: "2026-10-28T18:39:53.794Z",
  updatedAt: "2026-10-28T18:39:53.794Z",
} as const satisfies Lore
