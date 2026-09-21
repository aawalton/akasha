import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeSantaCanTYouHearMe = {
  id: "01a0676a-d728-703c-a8b7-370f7669aec1",
  type: "page-type/release",
  slug: "ariana-grande-santa-can-t-you-hear-me",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2021-10-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5RNKudvhTz6IX57BupmjeD",
      externalLink: "https://open.spotify.com/album/5RNKudvhTz6IX57BupmjeD",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Santa, Can’t You Hear Me",
} as const satisfies Release
