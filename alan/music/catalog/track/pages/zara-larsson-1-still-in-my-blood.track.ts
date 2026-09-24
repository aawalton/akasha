import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarsson1StillInMyBlood = {
  id: "01a0aa7c-3593-77e0-85df-13b3253e6f5c",
  type: "page-type/track",
  slug: "zara-larsson-1-still-in-my-blood",
  ownLength: 3.1896333333333335,
  ownProgress: 3.1896333333333335,
  partOfCollections: ["release/zara-larsson-1"],
  status: "completed",
  unit: "unit/minutes",
  title: "Still In My Blood",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "stillinmyblood|1Xylc3o4UrD53lo9CvFvVg|191378",
  song: "song/zara-larsson-still-in-my-blood",
  carriedBy: [
    {
      release: "release/zara-larsson-1",
      discNumber: 1,
      position: 11,
      externalId: "74fg5ykWIhis0NLxDOwqgQ",
      externalLink: "https://open.spotify.com/track/74fg5ykWIhis0NLxDOwqgQ",
    },
  ],
} as const satisfies Track
