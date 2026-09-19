import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSunGirlsTripTheAmbitionGirlsTrip = {
  id: "01a0aa7c-212e-7595-81d1-c9f1b8a8951e",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-girls-trip-the-ambition-girls-trip",
  ownLength: 3.2587166666666665,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun-girls-trip"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5k72K49XRktfr1tJ3chunx",
      externalLink: "https://open.spotify.com/track/5k72K49XRktfr1tJ3chunx",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Ambition - Girls Trip",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "2kRfqPViCqYdSGhYSM9R0Q", artistName: "Madison Beer" },
    { externalId: "6kf69CwzgodrETRgzcjX95", artistName: "BAMBII" },
  ],
  trackKey:
    "theambitiongirlstrip|1Xylc3o4UrD53lo9CvFvVg,2kRfqPViCqYdSGhYSM9R0Q,6kf69CwzgodrETRgzcjX95|195523",
  song: "song/zara-larsson-the-ambition-girls-trip",
} as const satisfies Track
