import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const testWorldFolk = {
  id: "01a17ec5-127a-7403-8668-8583d26d91ac",
  type: "page-type/lore",
  slug: "test-world-folk",
  title: "Test Folk",
  world: "world/test-world",
  about: "world/test-world",
  facts: [
    {
      fact: "The town's folk are friendly, patient, and used to strangers trying things twice.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The shopkeeper trades in plain copper coin and keeps the shop open from dawn to dusk.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A carter bound for the next town wants a hired sword to guard his load on the road.",
      knowers: ["lore-disclosure/game-master", "character-player/test-story-player"],
    },
  ],
  createdAt: "2026-10-27T19:10:06.969Z",
  updatedAt: "2026-10-27T23:57:35.062Z",
} as const satisfies Lore
