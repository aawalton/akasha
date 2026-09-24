import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSun3BlueMoon = {
  id: "01a0aa7c-290d-7c7a-9ea2-124e758225a2",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-3-blue-moon",
  ownLength: 3.03425,
  ownProgress: 3.03425,
  partOfCollections: [
    "release/zara-larsson-midnight-sun-3",
    "release/zara-larsson-midnight-sun-girls-trip",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Blue Moon",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "bluemoon|1Xylc3o4UrD53lo9CvFvVg|182055",
  song: "song/zara-larsson-blue-moon",
  carriedBy: [
    {
      release: "release/zara-larsson-midnight-sun-3",
      discNumber: 1,
      position: 2,
      externalId: "20R5YwjmKubeva79prlvJq",
      externalLink: "https://open.spotify.com/track/20R5YwjmKubeva79prlvJq",
    },
    {
      release: "release/zara-larsson-midnight-sun-girls-trip",
      discNumber: 2,
      position: 2,
      externalId: "00lTHGMQ7Z1pA6cXMKCCc7",
      externalLink: "https://open.spotify.com/track/00lTHGMQ7Z1pA6cXMKCCc7",
    },
  ],
} as const satisfies Track
