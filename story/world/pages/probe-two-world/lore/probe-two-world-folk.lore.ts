import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const probeTwoWorldFolk = {
  id: "01a17fbf-aff5-7c19-9ae5-1764c0d41266",
  type: "page-type/lore",
  slug: "probe-two-world-folk",
  title: "Test Folk",
  world: "world/probe-two-world",
  about: "world/probe-two-world",
  facts: [
    {
      fact: "The town's folk are friendly, patient, and used to strangers trying things twice.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The shopkeeper trades in plain copper coin and keeps the shop open from dawn to dusk.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies Lore
