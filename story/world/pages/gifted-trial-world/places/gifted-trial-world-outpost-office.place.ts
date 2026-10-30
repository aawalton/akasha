import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedTrialWorldOutpostOffice = {
  id: "01a18d10-93f1-761c-a4f6-ed894e1db1e3",
  type: "page-type/place",
  slug: "gifted-trial-world-outpost-office",
  title: "Factor's Office",
  world: "world/gifted-trial-world",
  within: "place/gifted-trial-world-horndale-outpost",
  depth: 0,
  exits: [
    {
      to: "place/gifted-trial-world-outpost-common-room",
      way: "Out to the entrance and its desk.",
    },
  ],
  facts: [
    {
      fact: "The Factor's office is lined with bookcases and smells of pipe smoke and tea.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A locked curio case sits against one wall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Society's ledgers and job postings for the pass are kept on the desk.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies Place
