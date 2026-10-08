import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const ellaHenderson = {
  id: "01a06803-676b-700a-a77e-a948cdd9af97",
  type: "page-type/artist",
  slug: "ella-henderson",
  title: "Ella Henderson",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  grade: "C",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7nDsS0l5ZAzMedVRKPP8F1",
      externalLink: "https://open.spotify.com/artist/7nDsS0l5ZAzMedVRKPP8F1",
      lastSyncedAt: "2026-02-19",
    },
  ],
  createdAt: "2026-09-03T16:04:08.683Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Artist
