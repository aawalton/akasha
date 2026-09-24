import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSunMoreMidnightSunInstrumental = {
  id: "01a0aa7c-266c-7a23-a5dd-c08f612296e0",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-more-midnight-sun-instrumental",
  ownLength: 3.0762,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun-more"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Midnight Sun - Instrumental",
  trackType: "instrumental",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "midnightsuninstrumental|1Xylc3o4UrD53lo9CvFvVg|184572",
  song: "song/zara-larsson-midnight-sun",
  carriedBy: [
    {
      release: "release/zara-larsson-midnight-sun-more",
      discNumber: 1,
      position: 2,
      externalId: "043NearEhVq8RpAUHtkY5r",
      externalLink: "https://open.spotify.com/track/043NearEhVq8RpAUHtkY5r",
    },
  ],
} as const satisfies Track
