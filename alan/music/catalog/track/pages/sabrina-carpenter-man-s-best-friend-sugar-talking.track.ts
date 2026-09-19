import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterManSBestFriendSugarTalking = {
  id: "01a0b111-1ba9-78a3-8948-c21763b4508a",
  type: "page-type/track",
  slug: "sabrina-carpenter-man-s-best-friend-sugar-talking",
  ownLength: 3.0628333333333333,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-man-s-best-friend"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5B3GZOZYXNzWpUXQC42hxZ",
      externalLink: "https://open.spotify.com/track/5B3GZOZYXNzWpUXQC42hxZ",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Sugar Talking",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "sugartalking|74KM79TiuVKeVCqs8QtB0B|183770",
  song: "song/sabrina-carpenter-sugar-talking",
} as const satisfies Track
