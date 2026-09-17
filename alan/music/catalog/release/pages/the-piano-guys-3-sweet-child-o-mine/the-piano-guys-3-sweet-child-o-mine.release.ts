import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3SweetChildOMine = {
  id: "01a0676a-d72b-7001-a242-6eba569b2d72",
  type: "page-type/release",
  slug: "the-piano-guys-3-sweet-child-o-mine",
  ownLength: 4.329166666666667,
  ownProgress: 4.329167,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2021-09-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "14d48yV0GbNhISMaZHjTaX",
      externalLink: "https://open.spotify.com/album/14d48yV0GbNhISMaZHjTaX",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Sweet Child o' Mine",
} as const satisfies Release
