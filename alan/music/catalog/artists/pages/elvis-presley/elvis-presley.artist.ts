import type { Artist } from "akasha/alan/music/catalog/artists/artist.page-type.types.ts"

export const elvisPresley = {
  id: "01a06803-676b-700b-be3d-e89a990f229f",
  type: "artist",
  slug: "elvis-presley",
  title: "Elvis Presley",
  partOfCollections: ["artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "archived",
  rank: "C",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "43ZHCT0cAZBISjO8DG9PnE",
      externalLink: "https://open.spotify.com/artist/43ZHCT0cAZBISjO8DG9PnE",
      lastSyncedAt: "2025-09-30",
    },
  ],
  tags: ["Classic Rock"],
} as const satisfies Artist
