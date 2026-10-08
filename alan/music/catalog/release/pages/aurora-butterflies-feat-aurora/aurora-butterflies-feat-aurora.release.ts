import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraButterfliesFeatAurora = {
  id: "01a0676a-d719-7048-b56b-1e15ca97c979",
  type: "page-type/release",
  slug: "aurora-butterflies-feat-aurora",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2023-01-27",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3399XMtHgSm7F0DClLiSsU",
      externalLink: "https://open.spotify.com/album/3399XMtHgSm7F0DClLiSsU",
    },
  ],
  title: "Butterflies (feat. AURORA)",
  createdAt: "2026-09-03T13:17:30.265Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
