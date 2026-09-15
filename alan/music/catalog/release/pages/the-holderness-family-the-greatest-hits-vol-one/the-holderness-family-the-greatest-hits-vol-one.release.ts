import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const theHoldernessFamilyTheGreatestHitsVolOne = {
  id: "01a0676a-d72d-7019-b8ba-ca2f8c596c40",
  type: "release",
  slug: "the-holderness-family-the-greatest-hits-vol-one",
  title: "The Greatest Hits, Vol. One",
  partOfCollections: ["artist/the-holderness-family"],
  position: 0,
  ownLength: 30.518767,
  ownProgress: 30.518767,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-10-21",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5msHeA78v7nyq2HgitoTmG",
      externalLink: "https://open.spotify.com/album/5msHeA78v7nyq2HgitoTmG",
      lastSyncedAt: "2025-11-27",
    },
  ],
} as const satisfies Release
