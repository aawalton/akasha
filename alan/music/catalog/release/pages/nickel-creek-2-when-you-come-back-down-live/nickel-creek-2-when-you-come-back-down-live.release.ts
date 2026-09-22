import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const nickelCreek2WhenYouComeBackDownLive = {
  id: "01a0676a-d731-7004-8826-80eed9796384",
  type: "page-type/release",
  slug: "nickel-creek-2-when-you-come-back-down-live",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/nickel-creek"],
  position: 0,
  publishedAt: "2022-10-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "28QYaRrqDwFu4PFpGMGwd8",
      externalLink: "https://open.spotify.com/album/28QYaRrqDwFu4PFpGMGwd8",
    },
  ],
  title: "When You Come Back Down (Live)",
} as const satisfies Release
