import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const gracieAbrams = {
  id: "01a06803-676b-7012-baef-4288d84185e4",
  type: "artist",
  slug: "gracie-abrams",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  rank: "B",
  status: "following",
  tags: ["Indie Pop Storyteller"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4tuJ0bMpJh08umKkEXKUI5",
      externalLink: "https://open.spotify.com/artist/4tuJ0bMpJh08umKkEXKUI5",
      lastSyncedAt: "2026-09-14",
    },
  ],
  title: "Gracie Abrams",
} as const satisfies Artist
