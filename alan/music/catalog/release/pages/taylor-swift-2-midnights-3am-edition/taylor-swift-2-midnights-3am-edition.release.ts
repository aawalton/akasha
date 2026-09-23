import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2Midnights3amEdition = {
  id: "01a0676a-d724-7066-be0a-293787a75197",
  type: "page-type/release",
  slug: "taylor-swift-2-midnights-3am-edition",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2022-10-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3lS1y25WAhcqJDATJK70Mq",
      externalLink: "https://open.spotify.com/album/3lS1y25WAhcqJDATJK70Mq",
    },
  ],
  title: "Midnights (3am Edition)",
} as const satisfies Release
