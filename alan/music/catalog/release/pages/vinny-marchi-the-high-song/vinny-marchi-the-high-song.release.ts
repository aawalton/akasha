import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiTheHighSong = {
  id: "01a0676a-d72d-7020-ba40-fac65fc22d4a",
  type: "page-type/release",
  slug: "vinny-marchi-the-high-song",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2023-05-26",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "774shlxSf3xN5lQOWbT2x5",
      externalLink: "https://open.spotify.com/album/774shlxSf3xN5lQOWbT2x5",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "The High Song",
} as const satisfies Release
