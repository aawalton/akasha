import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSun2MidnightSun = {
  id: "01a0aa7c-3655-7c3d-9c7f-3a78ebf49109",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-2-midnight-sun",
  ownLength: 3.7682333333333333,
  ownProgress: 3.7682333333333333,
  partOfCollections: ["release/zara-larsson-midnight-sun-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "Midnight Sun",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }, { artistName: "Muni Long" }],
  trackKey: "midnightsun|1Xylc3o4UrD53lo9CvFvVg,7tjVFCxJdwT4NdrTmjyjQ6|226094",
  song: "song/zara-larsson-midnight-sun",
  carriedBy: [
    {
      release: "release/zara-larsson-midnight-sun-2",
      discNumber: 1,
      position: 1,
      externalId: "6q2YSturdfEzMpoUR5gq0R",
      externalLink: "https://open.spotify.com/track/6q2YSturdfEzMpoUR5gq0R",
    },
  ],
} as const satisfies Track
