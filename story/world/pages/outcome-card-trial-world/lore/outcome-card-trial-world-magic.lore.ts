import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const outcomeCardTrialWorldMagic = {
  id: "01a183ae-dc71-7e90-afe5-ac84e7065dfa",
  type: "page-type/lore",
  slug: "outcome-card-trial-world-magic",
  title: "Test Magic",
  world: "world/outcome-card-trial-world",
  about: "world/outcome-card-trial-world",
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
  createdAt: "2026-10-28T18:03:59.696Z",
  updatedAt: "2026-10-28T18:03:59.696Z",
} as const satisfies Lore
