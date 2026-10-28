import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const outcomeCardTrialWorldFolk = {
  id: "01a183ae-dc71-7c48-84a8-201b2a7b1189",
  type: "page-type/lore",
  slug: "outcome-card-trial-world-folk",
  title: "Test Folk",
  world: "world/outcome-card-trial-world",
  about: "world/outcome-card-trial-world",
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
      knowers: ["lore-disclosure/game-master", "character-player/outcome-card-trial-player"],
    },
  ],
  createdAt: "2026-10-28T18:03:59.696Z",
  updatedAt: "2026-10-28T18:03:59.696Z",
} as const satisfies Lore
