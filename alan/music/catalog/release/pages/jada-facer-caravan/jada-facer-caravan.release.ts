import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerCaravan = {
  id: "01a0676a-d719-7062-8e00-53ea07c05d7f",
  type: "page-type/release",
  slug: "jada-facer-caravan",
  title: "Caravan",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 3.08235,
  ownProgress: 3.08235,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-10-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2CxyxiA6HrYIz3T0wdNfrb",
      externalLink: "https://open.spotify.com/album/2CxyxiA6HrYIz3T0wdNfrb",
    },
  ],
  createdAt: "2026-09-03T13:17:30.265Z",
  updatedAt: "2026-09-15T16:36:36.000Z",
} as const satisfies Release
