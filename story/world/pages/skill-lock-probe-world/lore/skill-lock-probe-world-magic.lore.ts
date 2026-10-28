import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const skillLockProbeWorldMagic = {
  id: "01a17ff2-6f78-78f2-8bba-ea06412dc3bd",
  type: "page-type/lore",
  slug: "skill-lock-probe-world-magic",
  title: "Test Magic",
  world: "world/skill-lock-probe-world",
  about: "world/skill-lock-probe-world",
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
  createdAt: "2026-10-28T00:39:19.516Z",
  updatedAt: "2026-10-28T00:39:19.516Z",
} as const satisfies Lore
