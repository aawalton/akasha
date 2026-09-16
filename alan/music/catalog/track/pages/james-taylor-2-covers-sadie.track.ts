import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2CoversSadie = {
  id: "01a0abeb-34ab-7967-a506-8032b6ee2261",
  type: "page-type/track",
  slug: "james-taylor-2-covers-sadie",
  ownLength: 4.580216666666667,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-covers"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0zo20NxWO8ZbcYpwSFykRo",
      externalLink: "https://open.spotify.com/track/0zo20NxWO8ZbcYpwSFykRo",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Sadie",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "sadie|0vn7UBvSQECKJm2817Yf1P|274813",
} as const satisfies Track
