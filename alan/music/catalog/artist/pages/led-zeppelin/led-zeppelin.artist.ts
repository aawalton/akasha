import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const ledZeppelin = {
  id: "01a06803-676b-7022-8845-9dd2a932aa91",
  type: "page-type/artist",
  slug: "led-zeppelin",
  title: "Led Zeppelin",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  grade: "C",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "36QJpDe2go2KgaRleHCDTp",
      externalLink: "https://open.spotify.com/artist/36QJpDe2go2KgaRleHCDTp",
      lastSyncedAt: "2025-09-30",
    },
  ],
  tags: ["Classic Rock"],
  createdAt: "2026-09-03T16:04:08.683Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Artist
