import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const yaelokre = {
  id: "01a06803-676c-7013-9310-2bf5cfbb8d9b",
  type: "page-type/artist",
  slug: "yaelokre",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  status: "following",
  tags: ["Folk"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3rRyfgGByetsaaujkjQ7rY",
      externalLink: "https://open.spotify.com/artist/3rRyfgGByetsaaujkjQ7rY",
      lastSyncedAt: "2026-09-23",
    },
  ],
  title: "Yaelokre",
  createdAt: "2026-09-03T16:04:08.684Z",
  updatedAt: "2026-09-23T13:49:18.000Z",
} as const satisfies Artist
