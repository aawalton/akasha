import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterManSBestFriendSugarTalking = {
  id: "01a0b111-1ba9-78a3-8948-c21763b4508a",
  type: "page-type/track",
  slug: "sabrina-carpenter-man-s-best-friend-sugar-talking",
  ownLength: 3.0628333333333333,
  ownProgress: 3.0628333333333333,
  partOfCollections: [
    "release/sabrina-carpenter-man-s-best-friend",
    "release/sabrina-carpenter-mans-best-friend-bonus-track-version",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Sugar Talking",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "sugartalking|74KM79TiuVKeVCqs8QtB0B|183770",
  song: "song/sabrina-carpenter-sugar-talking",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-man-s-best-friend",
      discNumber: 1,
      position: 4,
      externalId: "5B3GZOZYXNzWpUXQC42hxZ",
      externalLink: "https://open.spotify.com/track/5B3GZOZYXNzWpUXQC42hxZ",
    },
    {
      release: "release/sabrina-carpenter-mans-best-friend-bonus-track-version",
      discNumber: 1,
      position: 4,
      externalId: "5S7V849ZlfD5yh6Q7VNIwp",
      externalLink: "https://open.spotify.com/track/5S7V849ZlfD5yh6Q7VNIwp",
    },
  ],
} as const satisfies Track
