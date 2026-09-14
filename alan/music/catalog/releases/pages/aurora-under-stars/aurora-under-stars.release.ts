import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const auroraUnderStars = {
  id: "01a0676a-d72f-7033-9c44-21e453976ac8",
  type: "release",
  slug: "aurora-under-stars",
  title: "Under Stars",
  partOfCollections: ["artist/aurora"],
  position: 0,
  ownLength: 3.3171,
  ownProgress: 3.3171,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-12-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1oo0Ro40bKv7UM8lj2g3VN",
      externalLink: "https://open.spotify.com/album/1oo0Ro40bKv7UM8lj2g3VN",
    },
  ],
} as const satisfies Release
