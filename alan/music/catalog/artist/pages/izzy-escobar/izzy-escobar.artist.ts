import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const izzyEscobar = {
  id: "01a06803-676b-7016-9f04-01fd94a93f0c",
  type: "page-type/artist",
  slug: "izzy-escobar",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  grade: "B",
  status: "following",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "63iuP8EumHpqaaMKyi0pxO",
      externalLink: "https://open.spotify.com/artist/63iuP8EumHpqaaMKyi0pxO",
      lastSyncedAt: "2026-10-18",
    },
  ],
  title: "Izzy Escobar",
  createdAt: "2026-09-03T16:04:08.683Z",
  updatedAt: "2026-10-18T13:45:27.615Z",
} as const satisfies Artist
