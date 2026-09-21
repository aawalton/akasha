import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const kDa = {
  id: "01a06803-676b-701e-902e-5bf1a8b9d455",
  type: "page-type/artist",
  slug: "k-da",
  title: "K/DA",
  partOfCollections: ["artist-collection/artists", "fandom/league-of-legends"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  grade: "A",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4gOc8TsQed9eqnqJct2c5v",
      externalLink: "https://open.spotify.com/artist/4gOc8TsQed9eqnqJct2c5v",
      lastSyncedAt: "2026-03-02",
    },
  ],
} as const satisfies Artist
