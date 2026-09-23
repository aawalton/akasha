import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2SpeakNowTaylorSVersion = {
  id: "01a0676a-d729-7075-93b8-ca9012663eb3",
  type: "page-type/release",
  slug: "taylor-swift-2-speak-now-taylor-s-version",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2023-07-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5AEDGbliTTfjOB8TSm1sxt",
      externalLink: "https://open.spotify.com/album/5AEDGbliTTfjOB8TSm1sxt",
    },
  ],
  title: "Speak Now (Taylor's Version)",
} as const satisfies Release
