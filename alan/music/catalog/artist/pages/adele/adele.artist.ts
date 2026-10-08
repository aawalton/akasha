import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const adele = {
  id: "01a06803-676a-7000-abb8-8dc73e08c3fa",
  type: "page-type/artist",
  slug: "adele",
  title: "Adele",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  grade: "B",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4dpARuHxo51G3z768sgnrY",
      externalLink: "https://open.spotify.com/artist/4dpARuHxo51G3z768sgnrY",
      lastSyncedAt: "2026-09-24",
    },
  ],
  createdAt: "2026-09-03T16:04:08.682Z",
  updatedAt: "2026-09-24T20:46:51.000Z",
} as const satisfies Artist
