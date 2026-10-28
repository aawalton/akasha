import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const timeProbeWorldMagic = {
  id: "01a1802d-b13e-7158-9080-43b02f09c9be",
  type: "page-type/lore",
  slug: "time-probe-world-magic",
  title: "Test Magic",
  world: "world/time-probe-world",
  about: "world/time-probe-world",
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
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies Lore
