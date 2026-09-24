import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonSoGoodWhatTheySay = {
  id: "01a0aa7c-3217-7a7c-984f-f6ab72d56f98",
  type: "page-type/track",
  slug: "zara-larsson-so-good-what-they-say",
  ownLength: 3.6492166666666668,
  ownProgress: 3.6492166666666668,
  partOfCollections: ["release/zara-larsson-so-good"],
  status: "completed",
  unit: "unit/minutes",
  title: "What They Say",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "whattheysay|1Xylc3o4UrD53lo9CvFvVg|218953",
  song: "song/zara-larsson-what-they-say",
  carriedBy: [
    {
      release: "release/zara-larsson-so-good",
      discNumber: 1,
      position: 1,
      externalId: "1TOiDnIY8HgPyDLSR08QXq",
      externalLink: "https://open.spotify.com/track/1TOiDnIY8HgPyDLSR08QXq",
    },
  ],
} as const satisfies Track
