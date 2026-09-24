import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonLushLifeMidnightSunLushLife = {
  id: "01a0aa7c-3615-7671-acf7-62a4ebbd3310",
  type: "page-type/track",
  slug: "zara-larsson-lush-life-midnight-sun-lush-life",
  ownLength: 3.3378,
  ownProgress: 3.3378,
  partOfCollections: [
    "release/zara-larsson-lush-life-midnight-sun",
    "release/zara-larsson-lush-life-the-remixes",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Lush Life",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "lushlife|1Xylc3o4UrD53lo9CvFvVg|200268",
  song: "song/zara-larsson-lush-life",
  carriedBy: [
    {
      release: "release/zara-larsson-lush-life-midnight-sun",
      discNumber: 1,
      position: 1,
      externalId: "0NSSsLFk5txWb0I8bNNOKR",
      externalLink: "https://open.spotify.com/track/0NSSsLFk5txWb0I8bNNOKR",
    },
    {
      release: "release/zara-larsson-lush-life-the-remixes",
      discNumber: 1,
      position: 1,
      externalId: "7hGjlrBjEibu1rqbXYfgY9",
      externalLink: "https://open.spotify.com/track/7hGjlrBjEibu1rqbXYfgY9",
    },
  ],
} as const satisfies Track
