import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const theHoldernessFamilyQuarantineQueen = {
  id: "01a0676a-d727-7036-a9ed-116cdc8cb9f9",
  type: "page-type/release",
  slug: "the-holderness-family-quarantine-queen",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-holderness-family"],
  position: 0,
  publishedAt: "2020-04-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1gZPbQXfb3NaAyqZMiw9IE",
      externalLink: "https://open.spotify.com/album/1gZPbQXfb3NaAyqZMiw9IE",
      lastSyncedAt: "2025-11-27",
    },
  ],
  title: "Quarantine Queen",
} as const satisfies Release
