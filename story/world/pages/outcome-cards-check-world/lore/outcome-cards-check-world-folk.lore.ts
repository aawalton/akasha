import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const outcomeCardsCheckWorldFolk = {
  id: "01a17ffe-7d82-78b2-b837-9e0e2e0f3e65",
  type: "page-type/lore",
  slug: "outcome-cards-check-world-folk",
  title: "Test Folk",
  world: "world/outcome-cards-check-world",
  about: "world/outcome-cards-check-world",
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
      knowers: ["lore-disclosure/game-master", "character-player/outcome-cards-check-player"],
    },
  ],
  createdAt: "2026-10-28T00:52:29.403Z",
  updatedAt: "2026-10-28T00:52:29.403Z",
} as const satisfies Lore
