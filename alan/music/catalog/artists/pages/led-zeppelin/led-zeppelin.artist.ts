import type { Artist } from "akasha/alan/music/catalog/artists/artist.page-type.types.ts"

export const ledZeppelin = {
  id: "01a06803-676b-7022-8845-9dd2a932aa91",
  type: "artist",
  slug: "led-zeppelin",
  title: "Led Zeppelin",
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
      externalId: "36QJpDe2go2KgaRleHCDTp",
      externalLink: "https://open.spotify.com/artist/36QJpDe2go2KgaRleHCDTp",
      lastSyncedAt: "2025-09-30",
    },
  ],
  tags: ["Classic Rock"],
} as const satisfies Artist
