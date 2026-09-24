import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonSoGoodMakeThatMoneyGirl = {
  id: "01a0aa7c-3356-7de0-ba3c-789ab266deb2",
  type: "page-type/track",
  slug: "zara-larsson-so-good-make-that-money-girl",
  ownLength: 3.314783333333333,
  ownProgress: 3.314783333333333,
  partOfCollections: ["release/zara-larsson-so-good"],
  status: "completed",
  unit: "unit/minutes",
  title: "Make That Money Girl",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "makethatmoneygirl|1Xylc3o4UrD53lo9CvFvVg|198887",
  song: "song/zara-larsson-make-that-money-girl",
  carriedBy: [
    {
      release: "release/zara-larsson-so-good",
      discNumber: 1,
      position: 10,
      externalId: "1DJY8zj0Cbglv1kMjDivke",
      externalLink: "https://open.spotify.com/track/1DJY8zj0Cbglv1kMjDivke",
    },
  ],
} as const satisfies Track
