import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonPosterGirlINeedLove = {
  id: "01a0aa7c-3110-776f-ac9c-6ad7b6ecece3",
  type: "page-type/track",
  slug: "zara-larsson-poster-girl-i-need-love",
  ownLength: 3.0357166666666666,
  ownProgress: 3.0357166666666666,
  partOfCollections: [
    "release/zara-larsson-poster-girl",
    "release/zara-larsson-poster-girl-summer-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "I Need Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "ineedlove|1Xylc3o4UrD53lo9CvFvVg|182143",
  song: "song/zara-larsson-i-need-love",
  carriedBy: [
    {
      release: "release/zara-larsson-poster-girl",
      discNumber: 1,
      position: 7,
      externalId: "57CcOoiBg93ozKpIWEnceR",
      externalLink: "https://open.spotify.com/track/57CcOoiBg93ozKpIWEnceR",
    },
    {
      release: "release/zara-larsson-poster-girl-summer-edition",
      discNumber: 1,
      position: 7,
      externalId: "2sHO6TNbkIYXRHfcPJaaAh",
      externalLink: "https://open.spotify.com/track/2sHO6TNbkIYXRHfcPJaaAh",
    },
  ],
} as const satisfies Track
