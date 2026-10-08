import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const leonardCohen = {
  id: "01a06803-676b-7023-9822-b93ce4268131",
  type: "page-type/artist",
  slug: "leonard-cohen",
  title: "Leonard Cohen",
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
      externalId: "5l8VQNuIg0turYE1VtM9zV",
      externalLink: "https://open.spotify.com/artist/5l8VQNuIg0turYE1VtM9zV",
      lastSyncedAt: "2025-10-10",
    },
  ],
  tags: ["Folk"],
  createdAt: "2026-09-03T16:04:08.683Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Artist
