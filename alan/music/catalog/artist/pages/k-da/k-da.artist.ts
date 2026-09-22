import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const kDa = {
  id: "01a06803-676b-701e-902e-5bf1a8b9d455",
  type: "page-type/artist",
  slug: "k-da",
  grade: "A",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists", "fandom/league-of-legends"],
  position: 0,
  status: "following",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4gOc8TsQed9eqnqJct2c5v",
      externalLink: "https://open.spotify.com/artist/4gOc8TsQed9eqnqJct2c5v",
      lastSyncedAt: "2026-09-22",
    },
  ],
  title: "K/DA",
} as const satisfies Artist
