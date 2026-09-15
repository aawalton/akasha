import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lindseyStirling2ByNoMeans = {
  id: "01a0676a-d719-704e-9065-1716031bd88f",
  type: "page-type/release",
  slug: "lindsey-stirling-2-by-no-means",
  title: "By No Means",
  partOfCollections: ["artist/lindsey-stirling"],
  position: 0,
  ownLength: 3.530167,
  ownProgress: 3.530167,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2011-09-26",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "60QTnRaMZODqfw4hUFPKD2",
      externalLink: "https://open.spotify.com/album/60QTnRaMZODqfw4hUFPKD2",
    },
  ],
} as const satisfies Release
