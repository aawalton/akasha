import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2WillowMoonlitWitchVersion = {
  id: "01a0676a-d731-7023-b1f0-f25109439c41",
  type: "page-type/release",
  slug: "taylor-swift-2-willow-moonlit-witch-version",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2020-12-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5rZ2dHO8pco3A7cYToyvR0",
      externalLink: "https://open.spotify.com/album/5rZ2dHO8pco3A7cYToyvR0",
    },
  ],
  title: "willow (moonlit witch version)",
} as const satisfies Release
