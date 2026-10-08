import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const jadaFacer = {
  id: "01a06803-676b-7017-9ef6-363ea85fba5e",
  type: "page-type/artist",
  slug: "jada-facer",
  title: "Jada Facer",
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
      externalId: "4k51JgB5G0e33QYVpbcPuf",
      externalLink: "https://open.spotify.com/artist/4k51JgB5G0e33QYVpbcPuf",
      lastSyncedAt: "2025-09-30",
    },
  ],
  tags: ["Modern Pop"],
  createdAt: "2026-09-03T16:04:08.683Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Artist
