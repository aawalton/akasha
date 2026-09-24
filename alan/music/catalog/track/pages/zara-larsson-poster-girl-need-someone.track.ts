import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonPosterGirlNeedSomeone = {
  id: "01a0aa7c-306c-7a0b-becd-a1c3c4d840d9",
  type: "page-type/track",
  slug: "zara-larsson-poster-girl-need-someone",
  ownLength: 2.9560166666666667,
  ownProgress: 2.9560166666666667,
  partOfCollections: [
    "release/zara-larsson-poster-girl",
    "release/zara-larsson-poster-girl-summer-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Need Someone",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "needsomeone|1Xylc3o4UrD53lo9CvFvVg|177361",
  song: "song/zara-larsson-need-someone",
  carriedBy: [
    {
      release: "release/zara-larsson-poster-girl",
      discNumber: 1,
      position: 3,
      externalId: "2rXH6dk75hFUjg81BMJYFD",
      externalLink: "https://open.spotify.com/track/2rXH6dk75hFUjg81BMJYFD",
    },
    {
      release: "release/zara-larsson-poster-girl-summer-edition",
      discNumber: 1,
      position: 3,
      externalId: "5BR5QHwhW0FXdRj0OfYljZ",
      externalLink: "https://open.spotify.com/track/5BR5QHwhW0FXdRj0OfYljZ",
    },
  ],
} as const satisfies Track
