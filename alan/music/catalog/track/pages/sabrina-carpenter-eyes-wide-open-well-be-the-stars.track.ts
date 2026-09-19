import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEyesWideOpenWellBeTheStars = {
  id: "01a0b111-28b2-7122-b0c4-6492dc737ed3",
  type: "page-type/track",
  slug: "sabrina-carpenter-eyes-wide-open-well-be-the-stars",
  ownLength: 3.1146666666666665,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-eyes-wide-open"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7lqkNvVxJdYDCSAwSJNzHs",
      externalLink: "https://open.spotify.com/track/7lqkNvVxJdYDCSAwSJNzHs",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "We'll Be The Stars",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "wellbethestars|74KM79TiuVKeVCqs8QtB0B|186880",
  song: "song/sabrina-carpenter-well-be-the-stars",
} as const satisfies Track
