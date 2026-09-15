import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const greenDay = {
  id: "01a06803-676b-7013-ab1e-a09abef060e4",
  type: "page-type/artist",
  slug: "green-day",
  title: "Green Day",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  rank: "D",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7oPftvlwr6VrsViSDV7fJY",
      externalLink: "https://open.spotify.com/artist/7oPftvlwr6VrsViSDV7fJY",
      lastSyncedAt: "2025-10-04",
    },
  ],
  tags: ["Alternative Rock"],
} as const satisfies Artist
