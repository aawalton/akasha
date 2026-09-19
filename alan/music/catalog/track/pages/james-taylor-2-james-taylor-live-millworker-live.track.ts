import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveMillworkerLive = {
  id: "01a0abeb-3cd0-73df-a1a1-7c73895cecc8",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-millworker-live",
  ownLength: 4.4271,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3MNM77pnlKCuizCYMk7KkK",
      externalLink: "https://open.spotify.com/track/3MNM77pnlKCuizCYMk7KkK",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Millworker - Live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "millworkerlive|0vn7UBvSQECKJm2817Yf1P|265626",
  song: "song/james-taylor-millworker",
} as const satisfies Track
