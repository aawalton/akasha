import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const timeProbeWorldFolk = {
  id: "01a1802d-b13e-745d-8776-fb0830f361d0",
  type: "page-type/lore",
  slug: "time-probe-world-folk",
  title: "Test Folk",
  world: "world/time-probe-world",
  about: "world/time-probe-world",
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
      knowers: ["lore-disclosure/game-master", "character-player/time-probe-player"],
    },
  ],
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies Lore
