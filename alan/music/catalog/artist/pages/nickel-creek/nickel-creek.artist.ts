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
      lastSyncedAt: "2026-09-22",
    },
  ],
  title: "Nickel Creek",
} as const satisfies Artist
