import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const pendingRollTrialWorldFolk = {
  id: "01a183cf-b828-7110-9d80-1b91bf53c9d5",
  type: "page-type/lore",
  slug: "pending-roll-trial-world-folk",
  title: "Test Folk",
  world: "world/pending-roll-trial-world",
  about: "world/pending-roll-trial-world",
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
      knowers: ["lore-disclosure/game-master", "character-player/pending-roll-trial-player"],
    },
  ],
  createdAt: "2026-10-28T18:39:53.794Z",
  updatedAt: "2026-10-28T18:39:53.794Z",
} as const satisfies Lore
