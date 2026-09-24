import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSun3GirlsGirl = {
  id: "01a0aa7c-2956-7a49-810b-4a78cc1c6a69",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-3-girls-girl",
  ownLength: 2.970683333333333,
  ownProgress: 2.970683333333333,
  partOfCollections: [
    "release/zara-larsson-midnight-sun-3",
    "release/zara-larsson-midnight-sun-girls-trip",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Girl's Girl",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "girlsgirl|1Xylc3o4UrD53lo9CvFvVg|178241",
  song: "song/zara-larsson-girl-s-girl",
  carriedBy: [
    {
      release: "release/zara-larsson-midnight-sun-3",
      discNumber: 1,
      position: 4,
      externalId: "77jU18FIxXs5p4ebQoRrRD",
      externalLink: "https://open.spotify.com/track/77jU18FIxXs5p4ebQoRrRD",
    },
    {
      release: "release/zara-larsson-midnight-sun-girls-trip",
      discNumber: 2,
      position: 4,
      externalId: "0QKxuZ3TKrRlhLeEkhNdaH",
      externalLink: "https://open.spotify.com/track/0QKxuZ3TKrRlhLeEkhNdaH",
    },
  ],
} as const satisfies Track
