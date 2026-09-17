import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3LoveMeLikeIAm = {
  id: "01a0676a-d723-7072-94ba-dab69040bfde",
  type: "page-type/release",
  slug: "the-piano-guys-3-love-me-like-i-am",
  ownLength: 7.7111,
  ownProgress: 7.7111,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2023-03-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "40UIzH06cvi5tVIAviE3P7",
      externalLink: "https://open.spotify.com/album/40UIzH06cvi5tVIAviE3P7",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Love Me Like I Am",
} as const satisfies Release
