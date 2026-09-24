import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLiveFragileLive = {
  id: "01a0b4c8-57c9-79a5-9b25-6322551b94c0",
  type: "page-type/track",
  slug: "paul-cardall-live-fragile-live",
  ownLength: 2.8391,
  ownProgress: 2.8391,
  partOfCollections: ["release/paul-cardall-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Fragile - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "fragilelive|7FQRbf8gbKw8KZQZAJWxH2|170346",
  song: "song/paul-cardall-fragile",
  carriedBy: [
    {
      release: "release/paul-cardall-live",
      discNumber: 1,
      position: 4,
      externalId: "7pMcj48agTjNSkRqOTZJ7q",
      externalLink: "https://open.spotify.com/track/7pMcj48agTjNSkRqOTZJ7q",
    },
  ],
} as const satisfies Track
