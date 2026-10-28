import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const undoCheckWorldFolk = {
  id: "01a18309-e114-7c91-b539-3fe22b42e5c1",
  type: "page-type/lore",
  slug: "undo-check-world-folk",
  title: "Test Folk",
  world: "world/undo-check-world",
  about: "world/undo-check-world",
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
      knowers: ["lore-disclosure/game-master", "character-player/undo-check-player"],
    },
  ],
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:06:04.323Z",
} as const satisfies Lore
