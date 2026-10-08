import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const reneeRapp = {
  id: "01a06803-676c-7005-a11f-3a5274c158ae",
  type: "page-type/artist",
  slug: "renee-rapp",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  status: "following",
  tags: ["Indie Pop Storyteller"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2hUYKu1x0UZQXvzCmggvSn",
      externalLink: "https://open.spotify.com/artist/2hUYKu1x0UZQXvzCmggvSn",
      lastSyncedAt: "2026-09-22",
    },
  ],
  title: "Reneé Rapp",
  createdAt: "2026-09-03T16:04:08.684Z",
  updatedAt: "2026-09-22T19:47:54.000Z",
} as const satisfies Artist
