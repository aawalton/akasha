import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billyJoelLiveAtTheGreatAmericanMusicHall = {
  id: "01a0676a-d723-7046-a917-9463eb0d1293",
  type: "page-type/release",
  slug: "billy-joel-live-at-the-great-american-music-hall",
  title: "Live at The Great American Music Hall",
  partOfCollections: ["artist/billy-joel"],
  position: 0,
  ownLength: 71.0898,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-04-21",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0lmuUnlD8af6RkHAtJa5gP",
      externalLink: "https://open.spotify.com/album/0lmuUnlD8af6RkHAtJa5gP",
    },
  ],
} as const satisfies Release
