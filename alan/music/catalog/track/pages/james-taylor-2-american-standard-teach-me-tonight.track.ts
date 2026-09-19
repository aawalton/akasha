import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2AmericanStandardTeachMeTonight = {
  id: "01a0abeb-2e4c-7c6c-a2ad-4b8fd0a3f658",
  type: "page-type/track",
  slug: "james-taylor-2-american-standard-teach-me-tonight",
  ownLength: 2.98,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-american-standard"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2hVZIMjwyAWegOM0795wYx",
      externalLink: "https://open.spotify.com/track/2hVZIMjwyAWegOM0795wYx",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Teach Me Tonight",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "teachmetonight|0vn7UBvSQECKJm2817Yf1P|178800",
  song: "song/james-taylor-teach-me-tonight",
} as const satisfies Track
