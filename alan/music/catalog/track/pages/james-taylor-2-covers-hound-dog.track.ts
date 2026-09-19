import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2CoversHoundDog = {
  id: "01a0abeb-348c-735b-8262-1aa7f750cd16",
  type: "page-type/track",
  slug: "james-taylor-2-covers-hound-dog",
  ownLength: 3.050883333333333,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-covers"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2kqpwVLLYRuiYm8J8M4RrZ",
      externalLink: "https://open.spotify.com/track/2kqpwVLLYRuiYm8J8M4RrZ",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Hound Dog",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "hounddog|0vn7UBvSQECKJm2817Yf1P|183053",
  song: "song/james-taylor-hound-dog",
} as const satisfies Track
