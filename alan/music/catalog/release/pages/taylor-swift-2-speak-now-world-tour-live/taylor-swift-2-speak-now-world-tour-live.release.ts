import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2SpeakNowWorldTourLive = {
  id: "01a0676a-d729-7076-8a5a-7d01ead609d2",
  type: "page-type/release",
  slug: "taylor-swift-2-speak-now-world-tour-live",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2010-10-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6fyR4wBPwLHKcRtxgd4sGh",
      externalLink: "https://open.spotify.com/album/6fyR4wBPwLHKcRtxgd4sGh",
    },
  ],
  title: "Speak Now World Tour Live",
} as const satisfies Release
