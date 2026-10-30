import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedPolishWorldOutpostOffice = {
  id: "01a18e17-127d-7cad-9e5d-a677709a0309",
  type: "page-type/place",
  slug: "gifted-polish-world-outpost-office",
  title: "Factor's Office",
  world: "world/gifted-polish-world",
  within: "place/gifted-polish-world-horndale-outpost",
  depth: 0,
  exits: [
    {
      to: "place/gifted-polish-world-outpost-common-room",
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
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T18:34:02.178Z",
} as const satisfies Place
