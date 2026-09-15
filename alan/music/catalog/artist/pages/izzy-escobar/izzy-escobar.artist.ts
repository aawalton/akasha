import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const izzyEscobar = {
  id: "01a06803-676b-7016-9f04-01fd94a93f0c",
  type: "page-type/artist",
  slug: "izzy-escobar",
  title: "Izzy Escobar",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  rank: "B",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "63iuP8EumHpqaaMKyi0pxO",
      externalLink: "https://open.spotify.com/artist/63iuP8EumHpqaaMKyi0pxO",
      lastSyncedAt: "2026-02-16",
    },
  ],
} as const satisfies Artist
