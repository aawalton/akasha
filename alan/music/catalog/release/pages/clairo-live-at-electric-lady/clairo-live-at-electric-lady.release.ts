import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const clairoLiveAtElectricLady = {
  id: "01a0676a-d723-7043-a94c-51c06d12b7a8",
  type: "page-type/release",
  slug: "clairo-live-at-electric-lady",
  title: "Live at Electric Lady",
  partOfCollections: ["artist/clairo"],
  position: 0,
  ownLength: 19.649967,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-05-12",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2bxBgkzYqo9WBQgl0ZraY6",
      externalLink: "https://open.spotify.com/album/2bxBgkzYqo9WBQgl0ZraY6",
    },
  ],
} as const satisfies Release
