import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const girlInRedSpotifySingles = {
  id: "01a0676a-d72a-7009-a395-10f25312057f",
  type: "release",
  slug: "girl-in-red-spotify-singles",
  title: "Spotify Singles",
  partOfCollections: ["artist/girl-in-red"],
  position: 0,
  ownLength: 5.36215,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-09-08",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6H1GSOFY2sL863KbEYUq5c",
      externalLink: "https://open.spotify.com/album/6H1GSOFY2sL863KbEYUq5c",
    },
  ],
} as const satisfies Release
