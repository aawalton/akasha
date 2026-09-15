import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeSantaCanTYouHearMe = {
  id: "01a0676a-d728-703c-a8b7-370f7669aec1",
  type: "release",
  slug: "ariana-grande-santa-can-t-you-hear-me",
  title: "Santa, Can’t You Hear Me",
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  ownLength: 4.044067,
  ownProgress: 4.044067,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-10-14",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5RNKudvhTz6IX57BupmjeD",
      externalLink: "https://open.spotify.com/album/5RNKudvhTz6IX57BupmjeD",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Release
