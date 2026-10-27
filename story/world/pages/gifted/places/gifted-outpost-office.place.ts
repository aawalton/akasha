import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedOutpostOffice = {
  id: "01a17edb-c5da-7a10-acbd-78842a45efbc",
  type: "page-type/place",
  slug: "gifted-outpost-office",
  title: "Factor's Office",
  world: "world/gifted",
  within: "place/gifted-horndale-outpost",
  depth: 0,
  exits: [{ to: "place/gifted-outpost-common-room", way: "Out to the entrance and its desk." }],
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
  createdAt: "2026-10-27T19:34:54.679Z",
  updatedAt: "2026-10-27T19:34:54.679Z",
} as const satisfies Place
