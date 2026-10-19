import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixAttention = {
  id: "01a0676a-d717-703e-afbb-ce1c6978b9c2",
  type: "page-type/release",
  slug: "pentatonix-attention",
  title: "Attention",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-03-23",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6OMyQmPmiu4dKGC2gGd7pk",
      externalLink: "https://open.spotify.com/album/6OMyQmPmiu4dKGC2gGd7pk",
    },
  ],
  createdAt: "2026-09-03T13:17:30.263Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
