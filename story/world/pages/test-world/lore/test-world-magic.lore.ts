import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const testWorldMagic = {
  id: "01a17ec5-127b-7d17-92de-54d9bb669770",
  type: "page-type/lore",
  slug: "test-world-magic",
  title: "Test Magic",
  world: "world/test-world",
  about: "world/test-world",
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
      knowers: ["lore-disclosure/game-master", "character-player/beat-flow-test-player"],
    },
  ],
  createdAt: "2026-10-27T19:10:06.969Z",
  updatedAt: "2026-10-27T22:52:01.034Z",
} as const satisfies Lore
