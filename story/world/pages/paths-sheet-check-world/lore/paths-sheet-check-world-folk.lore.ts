import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const pathsSheetCheckWorldFolk = {
  id: "01a182db-5bf2-7b1a-86a4-5e1f27998f8d",
  type: "page-type/lore",
  slug: "paths-sheet-check-world-folk",
  title: "Test Folk",
  world: "world/paths-sheet-check-world",
  about: "world/paths-sheet-check-world",
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
      knowers: ["lore-disclosure/game-master", "character-player/paths-sheet-check-player"],
    },
  ],
  createdAt: "2026-10-28T14:12:58.526Z",
  updatedAt: "2026-10-28T14:12:58.526Z",
} as const satisfies Lore
