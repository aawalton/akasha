import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2AmericanStandardMoonRiver = {
  id: "01a0abeb-2e30-75d4-b47d-3154ad33bfa6",
  type: "page-type/track",
  slug: "james-taylor-2-american-standard-moon-river",
  ownLength: 3.2202166666666665,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-american-standard"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "46RxitOCzS5JhvDwongOS0",
      externalLink: "https://open.spotify.com/track/46RxitOCzS5JhvDwongOS0",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Moon River",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "moonriver|0vn7UBvSQECKJm2817Yf1P|193213",
  song: "song/james-taylor-moon-river",
} as const satisfies Track
