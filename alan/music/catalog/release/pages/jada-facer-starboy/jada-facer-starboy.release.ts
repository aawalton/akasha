import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerStarboy = {
  id: "01a0676a-d72a-7010-ae3f-8dbb0ffb00a9",
  type: "page-type/release",
  slug: "jada-facer-starboy",
  title: "Starboy",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 3.3172,
  ownProgress: 3.3172,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2016-10-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4lV4Dwbas6CmetnEzdhh4R",
      externalLink: "https://open.spotify.com/album/4lV4Dwbas6CmetnEzdhh4R",
    },
  ],
  createdAt: "2026-09-03T13:17:30.282Z",
  updatedAt: "2026-09-15T16:36:36.000Z",
} as const satisfies Release
