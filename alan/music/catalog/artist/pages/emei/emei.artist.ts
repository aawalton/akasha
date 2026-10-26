import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const emei = {
  id: "01a06803-676b-700d-a809-e33bfe526067",
  type: "page-type/artist",
  slug: "emei",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  grade: "B",
  status: "following",
  tags: ["Indie Pop Storyteller"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7E2aQQjErJocovYFjYLzWU",
      externalLink: "https://open.spotify.com/artist/7E2aQQjErJocovYFjYLzWU",
      lastSyncedAt: "2026-10-26",
    },
  ],
  title: "Emei",
  createdAt: "2026-09-03T16:04:08.683Z",
  updatedAt: "2026-10-26T13:48:20.183Z",
} as const satisfies Artist
