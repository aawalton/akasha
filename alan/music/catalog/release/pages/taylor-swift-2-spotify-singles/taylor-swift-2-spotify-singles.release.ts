import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2SpotifySingles = {
  id: "01a0676a-d72a-7004-a0b9-eafe6dd80b54",
  type: "page-type/release",
  slug: "taylor-swift-2-spotify-singles",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2018-04-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "74utZeTCeaXy01BjOddyv8",
      externalLink: "https://open.spotify.com/album/74utZeTCeaXy01BjOddyv8",
    },
  ],
  title: "Spotify Singles",
} as const satisfies Release
