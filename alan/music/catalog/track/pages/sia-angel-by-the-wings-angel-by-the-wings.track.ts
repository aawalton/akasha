import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaAngelByTheWingsAngelByTheWings = {
  id: "01a0a59c-35d1-7d59-b9e9-ae0b29ef8795",
  type: "page-type/track",
  slug: "sia-angel-by-the-wings-angel-by-the-wings",
  ownLength: 5.32,
  ownProgress: 0,
  partOfCollections: ["release/sia-angel-by-the-wings"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4OLVK3kktkdLPp8dDgoCtb",
      externalLink: "https://open.spotify.com/track/4OLVK3kktkdLPp8dDgoCtb",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Angel By The Wings",
} as const satisfies Track
