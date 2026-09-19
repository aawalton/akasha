import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarsson1StillInMyBlood = {
  id: "01a0aa7c-3593-77e0-85df-13b3253e6f5c",
  type: "page-type/track",
  slug: "zara-larsson-1-still-in-my-blood",
  ownLength: 3.1896333333333335,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-1"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "74fg5ykWIhis0NLxDOwqgQ",
      externalLink: "https://open.spotify.com/track/74fg5ykWIhis0NLxDOwqgQ",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Still In My Blood",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "stillinmyblood|1Xylc3o4UrD53lo9CvFvVg|191378",
  song: "song/zara-larsson-still-in-my-blood",
} as const satisfies Track
