import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const backstreetBoys = {
  id: "01a06803-676b-7000-98d1-69e3e109f37a",
  type: "page-type/artist",
  slug: "backstreet-boys",
  title: "Backstreet Boys",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5rSXSAkZ67PYJSvpUpkOr7",
      externalLink: "https://open.spotify.com/artist/5rSXSAkZ67PYJSvpUpkOr7",
      lastSyncedAt: "2025-09-30",
    },
  ],
  tags: ["Boy Bands"],
  createdAt: "2026-09-03T16:04:08.683Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Artist
