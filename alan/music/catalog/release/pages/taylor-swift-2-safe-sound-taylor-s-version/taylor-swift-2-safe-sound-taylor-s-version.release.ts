import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2SafeSoundTaylorSVersion = {
  id: "01a0676a-d728-703a-8c80-523d21c4fe3b",
  type: "page-type/release",
  slug: "taylor-swift-2-safe-sound-taylor-s-version",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2021-11-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4eZKjfeKPSwd6NYsmlKjuR",
      externalLink: "https://open.spotify.com/album/4eZKjfeKPSwd6NYsmlKjuR",
    },
  ],
  title: "Safe & Sound (Taylor's Version)",
} as const satisfies Release
