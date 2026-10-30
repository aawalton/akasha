import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedTrial2WorldOutpostOffice = {
  id: "01a18dab-06cd-7adc-8d4d-0d267502e610",
  type: "page-type/place",
  slug: "gifted-trial2-world-outpost-office",
  title: "Factor's Office",
  world: "world/gifted-trial2-world",
  within: "place/gifted-trial2-world-horndale-outpost",
  depth: 0,
  exits: [
    {
      to: "place/gifted-trial2-world-outpost-common-room",
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
  createdAt: "2026-10-30T16:36:03.198Z",
  updatedAt: "2026-10-30T16:36:03.198Z",
} as const satisfies Place
