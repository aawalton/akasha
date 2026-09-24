import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonPosterGirlLoveMeLand = {
  id: "01a0aa7c-301e-786a-b4f8-4c994a2b60fd",
  type: "page-type/track",
  slug: "zara-larsson-poster-girl-love-me-land",
  ownLength: 2.6719333333333335,
  ownProgress: 2.6719333333333335,
  partOfCollections: [
    "release/zara-larsson-poster-girl",
    "release/zara-larsson-poster-girl-summer-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Love Me Land",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "lovemeland|1Xylc3o4UrD53lo9CvFvVg|160316",
  song: "song/zara-larsson-love-me-land",
  carriedBy: [
    {
      release: "release/zara-larsson-poster-girl",
      discNumber: 1,
      position: 1,
      externalId: "1dKmaDRG1KvqwANvlhIyqx",
      externalLink: "https://open.spotify.com/track/1dKmaDRG1KvqwANvlhIyqx",
    },
    {
      release: "release/zara-larsson-poster-girl-summer-edition",
      discNumber: 1,
      position: 1,
      externalId: "0y38hbZ7yGrwOilYoqOv8c",
      externalLink: "https://open.spotify.com/track/0y38hbZ7yGrwOilYoqOv8c",
    },
  ],
} as const satisfies Track
