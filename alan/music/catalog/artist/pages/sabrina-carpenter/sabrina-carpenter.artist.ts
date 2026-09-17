import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const sabrinaCarpenter = {
  id: "01a06803-676c-7007-ad42-2732899cfd52",
  type: "page-type/artist",
  slug: "sabrina-carpenter",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  rank: "B",
  status: "following",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "74KM79TiuVKeVCqs8QtB0B",
      externalLink: "https://open.spotify.com/artist/74KM79TiuVKeVCqs8QtB0B",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Sabrina Carpenter",
} as const satisfies Artist
