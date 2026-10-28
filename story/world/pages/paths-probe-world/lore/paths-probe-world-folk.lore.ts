import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const pathsProbeWorldFolk = {
  id: "01a18008-7533-7bb2-bfde-bdc2d7d6b846",
  type: "page-type/lore",
  slug: "paths-probe-world-folk",
  title: "Test Folk",
  world: "world/paths-probe-world",
  about: "world/paths-probe-world",
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
      knowers: ["lore-disclosure/game-master", "character-player/paths-probe-player"],
    },
  ],
  createdAt: "2026-10-28T01:03:22.622Z",
  updatedAt: "2026-10-28T01:03:22.622Z",
} as const satisfies Lore
