import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jisooMeFlower = {
  id: "01a0afa2-7394-7975-897a-31065e855c0e",
  type: "page-type/track",
  slug: "jisoo-me-flower",
  ownLength: 2.8855666666666666,
  ownProgress: 0,
  partOfCollections: ["release/jisoo-me"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "69CrOS7vEHIrhC2ILyEi0s",
      externalLink: "https://open.spotify.com/track/69CrOS7vEHIrhC2ILyEi0s",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "FLOWER",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6UZ0ba50XreR4TM8u322gs", artistName: "JISOO" }],
  trackKey: "flower|6UZ0ba50XreR4TM8u322gs|173134",
  song: "song/jisoo-flower",
} as const satisfies Track
