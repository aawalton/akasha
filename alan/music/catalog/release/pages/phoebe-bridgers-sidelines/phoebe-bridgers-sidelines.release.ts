import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const phoebeBridgersSidelines = {
  id: "01a0676a-d729-7002-a89c-f57567ae7450",
  type: "release",
  slug: "phoebe-bridgers-sidelines",
  title: "Sidelines",
  partOfCollections: ["artist/phoebe-bridgers"],
  position: 0,
  ownLength: 4.4062,
  ownProgress: 4.4062,
  unit: "unit/minutes",
  status: "completed",
  rank: "C",
  publishedAt: "2022-04-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7tCdWRuurBiq82DvVDCGgF",
      externalLink: "https://open.spotify.com/album/7tCdWRuurBiq82DvVDCGgF",
    },
  ],
} as const satisfies Release
