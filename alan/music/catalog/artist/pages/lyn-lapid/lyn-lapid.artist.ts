import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const lynLapid = {
  id: "01a06803-676b-7027-890c-80707c9be725",
  type: "page-type/artist",
  slug: "lyn-lapid",
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
      externalId: "4pfy05cNNTacuOQ6SiSu4v",
      externalLink: "https://open.spotify.com/artist/4pfy05cNNTacuOQ6SiSu4v",
      lastSyncedAt: "2026-09-22",
    },
  ],
  title: "Lyn Lapid",
} as const satisfies Artist
