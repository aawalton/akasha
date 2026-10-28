import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const pathsProbeWorldMagic = {
  id: "01a18008-7533-76cb-a4db-67ef3e93c1fc",
  type: "page-type/lore",
  slug: "paths-probe-world-magic",
  title: "Test Magic",
  world: "world/paths-probe-world",
  about: "world/paths-probe-world",
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
  createdAt: "2026-10-28T01:03:22.622Z",
  updatedAt: "2026-10-28T01:03:22.622Z",
} as const satisfies Lore
