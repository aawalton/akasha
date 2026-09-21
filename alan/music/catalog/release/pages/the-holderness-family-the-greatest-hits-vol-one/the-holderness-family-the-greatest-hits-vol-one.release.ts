import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const theHoldernessFamilyTheGreatestHitsVolOne = {
  id: "01a0676a-d72d-7019-b8ba-ca2f8c596c40",
  type: "page-type/release",
  slug: "the-holderness-family-the-greatest-hits-vol-one",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-holderness-family"],
  position: 0,
  publishedAt: "2018-10-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5msHeA78v7nyq2HgitoTmG",
      externalLink: "https://open.spotify.com/album/5msHeA78v7nyq2HgitoTmG",
      lastSyncedAt: "2025-11-27",
    },
  ],
  title: "The Greatest Hits, Vol. One",
} as const satisfies Release
