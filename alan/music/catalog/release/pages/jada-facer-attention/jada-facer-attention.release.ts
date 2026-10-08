import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerAttention = {
  id: "01a0676a-d717-703d-9609-150e360fa33c",
  type: "page-type/release",
  slug: "jada-facer-attention",
  title: "Attention",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 3.333333,
  ownProgress: 3.333333,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-06-14",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2f43i7K8jxIZAoltmMpqL0",
      externalLink: "https://open.spotify.com/album/2f43i7K8jxIZAoltmMpqL0",
    },
  ],
  createdAt: "2026-09-03T13:17:30.263Z",
  updatedAt: "2026-09-15T16:36:07.000Z",
} as const satisfies Release
