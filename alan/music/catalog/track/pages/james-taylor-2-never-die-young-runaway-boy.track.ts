import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NeverDieYoungRunawayBoy = {
  id: "01a0abeb-40fb-721d-8ae1-3af4fe0aa4cc",
  type: "page-type/track",
  slug: "james-taylor-2-never-die-young-runaway-boy",
  ownLength: 4.26555,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-never-die-young"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2d2rnhj1TolgOQnhOslfdE",
      externalLink: "https://open.spotify.com/track/2d2rnhj1TolgOQnhOslfdE",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Runaway Boy",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "runawayboy|0vn7UBvSQECKJm2817Yf1P|255933",
  song: "song/james-taylor-runaway-boy",
} as const satisfies Track
