import type { Artist } from "akasha/alan/music/catalog/artists/artist.page-type.types.ts"

export const backstreetBoys = {
  id: "01a06803-676b-7000-98d1-69e3e109f37a",
  type: "artist",
  slug: "backstreet-boys",
  title: "Backstreet Boys",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  rank: "C",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5rSXSAkZ67PYJSvpUpkOr7",
      externalLink: "https://open.spotify.com/artist/5rSXSAkZ67PYJSvpUpkOr7",
      lastSyncedAt: "2025-09-30",
    },
  ],
  tags: ["Boy Bands"],
} as const satisfies Artist
