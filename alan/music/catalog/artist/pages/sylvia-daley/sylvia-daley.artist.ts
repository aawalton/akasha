import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const sylviaDaley = {
  id: "01a06803-676c-700a-a8bc-f7583737dc27",
  type: "page-type/artist",
  slug: "sylvia-daley",
  title: "Sylvia Daley",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  rank: "A",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "03dXd2zBbBJvX60Oap8Lgo",
      externalLink: "https://open.spotify.com/artist/03dXd2zBbBJvX60Oap8Lgo",
      lastSyncedAt: "2026-02-17",
    },
  ],
} as const satisfies Artist
