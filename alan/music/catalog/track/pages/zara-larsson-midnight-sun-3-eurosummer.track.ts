import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSun3Eurosummer = {
  id: "01a0aa7c-29a6-7a0e-9366-174a2ea32f11",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-3-eurosummer",
  ownLength: 2.881066666666667,
  ownProgress: 2.881066666666667,
  partOfCollections: [
    "release/zara-larsson-midnight-sun-3",
    "release/zara-larsson-midnight-sun-girls-trip",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Eurosummer",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "eurosummer|1Xylc3o4UrD53lo9CvFvVg|172864",
  song: "song/zara-larsson-euro-summer",
  carriedBy: [
    {
      release: "release/zara-larsson-midnight-sun-3",
      discNumber: 1,
      position: 6,
      externalId: "2EhJHJV7itLmFGH1CQoK3i",
      externalLink: "https://open.spotify.com/track/2EhJHJV7itLmFGH1CQoK3i",
    },
    {
      release: "release/zara-larsson-midnight-sun-girls-trip",
      discNumber: 2,
      position: 6,
      externalId: "5k8ciXff4wO0OtQOnN8NEg",
      externalLink: "https://open.spotify.com/track/5k8ciXff4wO0OtQOnN8NEg",
    },
  ],
} as const satisfies Track
