import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const harryStyles = {
  id: "01a06803-676b-7014-81a2-4a910a5adaca",
  type: "artist",
  slug: "harry-styles",
  title: "Harry Styles",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  rank: "C",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6KImCVD70vtIoJWnq6nGn3",
      externalLink: "https://open.spotify.com/artist/6KImCVD70vtIoJWnq6nGn3",
      lastSyncedAt: "2025-09-30",
    },
  ],
  tags: ["Boy Bands"],
} as const satisfies Artist
