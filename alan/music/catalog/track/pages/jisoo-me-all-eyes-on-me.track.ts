import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jisooMeAllEyesOnMe = {
  id: "01a0afa2-73b8-73f5-9962-9e2587222491",
  type: "page-type/track",
  slug: "jisoo-me-all-eyes-on-me",
  ownLength: 2.7253666666666665,
  ownProgress: 0,
  partOfCollections: ["release/jisoo-me"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2YXswOX5aKv6OHRKUcAMLQ",
      externalLink: "https://open.spotify.com/track/2YXswOX5aKv6OHRKUcAMLQ",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "All Eyes On Me",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6UZ0ba50XreR4TM8u322gs", artistName: "JISOO" }],
  trackKey: "alleyesonme|6UZ0ba50XreR4TM8u322gs|163522",
  song: "song/jisoo-all-eyes-on-me",
} as const satisfies Track
