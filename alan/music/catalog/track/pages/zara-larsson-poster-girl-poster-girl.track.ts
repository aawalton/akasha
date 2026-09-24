import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonPosterGirlPosterGirl = {
  id: "01a0aa7c-30e6-76b9-b9c1-8e39b23c0fc0",
  type: "page-type/track",
  slug: "zara-larsson-poster-girl-poster-girl",
  ownLength: 2.9509,
  ownProgress: 2.9509,
  partOfCollections: [
    "release/zara-larsson-poster-girl",
    "release/zara-larsson-poster-girl-summer-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Poster Girl",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "postergirl|1Xylc3o4UrD53lo9CvFvVg|177054",
  song: "song/zara-larsson-poster-girl",
  carriedBy: [
    {
      release: "release/zara-larsson-poster-girl",
      discNumber: 1,
      position: 6,
      externalId: "1MGqtRnKlHNO4fuHMm2Dm9",
      externalLink: "https://open.spotify.com/track/1MGqtRnKlHNO4fuHMm2Dm9",
    },
    {
      release: "release/zara-larsson-poster-girl-summer-edition",
      discNumber: 1,
      position: 6,
      externalId: "3tAdEFSKTCkntRGasEcESl",
      externalLink: "https://open.spotify.com/track/3tAdEFSKTCkntRGasEcESl",
    },
  ],
} as const satisfies Track
