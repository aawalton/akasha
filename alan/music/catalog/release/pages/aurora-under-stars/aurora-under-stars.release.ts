import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraUnderStars = {
  id: "01a0676a-d72f-7033-9c44-21e453976ac8",
  type: "page-type/release",
  slug: "aurora-under-stars",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2014-12-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1oo0Ro40bKv7UM8lj2g3VN",
      externalLink: "https://open.spotify.com/album/1oo0Ro40bKv7UM8lj2g3VN",
    },
  ],
  title: "Under Stars",
  createdAt: "2026-09-03T13:17:30.287Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
