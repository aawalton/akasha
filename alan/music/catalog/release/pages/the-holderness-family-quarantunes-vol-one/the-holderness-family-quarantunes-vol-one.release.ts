import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const theHoldernessFamilyQuarantunesVolOne = {
  id: "01a0676a-d727-7037-a350-f051120ca49c",
  type: "page-type/release",
  slug: "the-holderness-family-quarantunes-vol-one",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-holderness-family"],
  position: 0,
  publishedAt: "2020-04-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0LiTRvhnM2a2AN1f3zrXEX",
      externalLink: "https://open.spotify.com/album/0LiTRvhnM2a2AN1f3zrXEX",
      lastSyncedAt: "2025-11-27",
    },
  ],
  title: "Quarantunes, Vol. One",
  createdAt: "2026-09-03T13:17:30.279Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
