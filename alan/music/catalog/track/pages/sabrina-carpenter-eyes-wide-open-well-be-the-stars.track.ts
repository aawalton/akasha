import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEyesWideOpenWellBeTheStars = {
  id: "01a0b111-28b2-7122-b0c4-6492dc737ed3",
  type: "page-type/track",
  slug: "sabrina-carpenter-eyes-wide-open-well-be-the-stars",
  ownLength: 3.1146666666666665,
  ownProgress: 3.1146666666666665,
  partOfCollections: ["release/sabrina-carpenter-eyes-wide-open"],
  status: "completed",
  unit: "unit/minutes",
  title: "We'll Be The Stars",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "wellbethestars|74KM79TiuVKeVCqs8QtB0B|186880",
  song: "song/sabrina-carpenter-well-be-the-stars",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-eyes-wide-open",
      discNumber: 1,
      position: 4,
      externalId: "7lqkNvVxJdYDCSAwSJNzHs",
      externalLink: "https://open.spotify.com/track/7lqkNvVxJdYDCSAwSJNzHs",
    },
  ],
} as const satisfies Track
