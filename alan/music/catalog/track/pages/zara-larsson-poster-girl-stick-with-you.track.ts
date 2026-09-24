import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonPosterGirlStickWithYou = {
  id: "01a0aa7c-3193-7357-a87d-c80242a7fec4",
  type: "page-type/track",
  slug: "zara-larsson-poster-girl-stick-with-you",
  ownLength: 2.9917,
  ownProgress: 2.9917,
  partOfCollections: [
    "release/zara-larsson-poster-girl",
    "release/zara-larsson-poster-girl-summer-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Stick With You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "stickwithyou|1Xylc3o4UrD53lo9CvFvVg|179502",
  song: "song/zara-larsson-stick-with-you",
  carriedBy: [
    {
      release: "release/zara-larsson-poster-girl",
      discNumber: 1,
      position: 10,
      externalId: "0wXyiZkKXFHwPAGF0LuoVV",
      externalLink: "https://open.spotify.com/track/0wXyiZkKXFHwPAGF0LuoVV",
    },
    {
      release: "release/zara-larsson-poster-girl-summer-edition",
      discNumber: 1,
      position: 10,
      externalId: "6hSb5iGBZoxVOzWwdlslD7",
      externalLink: "https://open.spotify.com/track/6hSb5iGBZoxVOzWwdlslD7",
    },
  ],
} as const satisfies Track
