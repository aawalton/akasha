import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioSacredIiProudOfMe = {
  id: "01a0c622-0f5a-7e34-9fa8-cd9dc612f76a",
  type: "page-type/track",
  slug: "jessica-baio-sacred-ii-proud-of-me",
  ownLength: 2.7638,
  ownProgress: 2.7638,
  partOfCollections: ["release/jessica-baio-sacred-ii"],
  status: "completed",
  unit: "unit/minutes",
  title: "proud of me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/jessica-baio" }],
  trackKey: "proudofme|0VMFTqmv0hYlWruyBERT95|165828",
  song: "song/jessica-baio-proud-of-me",
  carriedBy: [
    {
      release: "release/jessica-baio-sacred-ii",
      discNumber: 1,
      position: 6,
      externalId: "096L2VjNlWSR6IPWRuZxbL",
      externalLink: "https://open.spotify.com/track/096L2VjNlWSR6IPWRuZxbL",
    },
  ],
} as const satisfies Track
