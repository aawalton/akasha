import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const nickelCreek = {
  id: "01a06803-676c-7000-abea-c3af47f95595",
  type: "page-type/artist",
  slug: "nickel-creek",
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
      externalId: "3bcLBxvaI7GsBzGp3WHnwQ",
      externalLink: "https://open.spotify.com/artist/3bcLBxvaI7GsBzGp3WHnwQ",
      lastSyncedAt: "2026-10-30",
    },
  ],
  title: "Nickel Creek",
  createdAt: "2026-09-03T16:04:08.684Z",
  updatedAt: "2026-10-30T13:48:59.244Z",
} as const satisfies Artist
