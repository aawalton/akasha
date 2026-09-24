import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jisooMeAllEyesOnMe = {
  id: "01a0afa2-73b8-73f5-9962-9e2587222491",
  type: "page-type/track",
  slug: "jisoo-me-all-eyes-on-me",
  ownLength: 2.7253666666666665,
  ownProgress: 2.7253666666666665,
  partOfCollections: ["release/jisoo-me"],
  status: "completed",
  unit: "unit/minutes",
  title: "All Eyes On Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/jisoo" }],
  trackKey: "alleyesonme|6UZ0ba50XreR4TM8u322gs|163522",
  song: "song/jisoo-all-eyes-on-me",
  carriedBy: [
    {
      release: "release/jisoo-me",
      discNumber: 1,
      position: 2,
      externalId: "2YXswOX5aKv6OHRKUcAMLQ",
      externalLink: "https://open.spotify.com/track/2YXswOX5aKv6OHRKUcAMLQ",
    },
  ],
} as const satisfies Track
