import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const memoCheckWorldFolk = {
  id: "01a1832d-38c0-70b1-99a5-93d7b61ff921",
  type: "page-type/lore",
  slug: "memo-check-world-folk",
  title: "Test Folk",
  world: "world/memo-check-world",
  about: "world/memo-check-world",
  facts: [
    {
      fact: "The town's folk are friendly, patient, and used to strangers trying things twice.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The shopkeeper trades in plain copper coin and keeps the shop open from dawn to dusk.",
      knowers: ["lore-disclosure/game-master", "character-player/memo-check-player"],
    },
    {
      fact: "A carter bound for the next town wants a hired sword to guard his load on the road.",
      knowers: ["lore-disclosure/game-master", "character-player/memo-check-player"],
    },
  ],
  createdAt: "2026-10-28T15:42:23.600Z",
  updatedAt: "2026-10-28T15:42:41.462Z",
} as const satisfies Lore
