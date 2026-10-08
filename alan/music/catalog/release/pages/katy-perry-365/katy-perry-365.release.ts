import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerry365 = {
  id: "01a0676a-d715-7008-89be-aee3444326a3",
  type: "page-type/release",
  slug: "katy-perry-365",
  title: "365",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 3.03165,
  ownProgress: 3.03165,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-02-14",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7DMS5dzWQu7R3D59CKw4TA",
      externalLink: "https://open.spotify.com/album/7DMS5dzWQu7R3D59CKw4TA",
    },
  ],
  createdAt: "2026-09-03T13:17:30.261Z",
  updatedAt: "2026-09-15T16:37:02.000Z",
} as const satisfies Release
