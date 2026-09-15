import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const michaelJacksonGotToBeThere = {
  id: "01a0676a-d71f-7022-8152-00b68fa5f2ea",
  type: "page-type/release",
  slug: "michael-jackson-got-to-be-there",
  title: "Got To Be There",
  partOfCollections: ["artist/michael-jackson"],
  position: 0,
  ownLength: 35.8315,
  ownProgress: 35.8315,
  unit: "unit/minutes",
  status: "completed",
  rank: "C",
  publishedAt: "1972-01-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0F4XW0iBOhNFkbn1BuQ8cu",
      externalLink: "https://open.spotify.com/album/0F4XW0iBOhNFkbn1BuQ8cu",
      lastSyncedAt: "2025-10-04",
    },
  ],
} as const satisfies Release
