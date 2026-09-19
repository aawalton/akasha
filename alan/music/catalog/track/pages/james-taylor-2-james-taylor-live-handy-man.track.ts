import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveHandyMan = {
  id: "01a0abeb-3c05-72e2-a5f7-085374db7b4e",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-handy-man",
  ownLength: 3.52555,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2kuTmskJFZW1L3FMMJFSFp",
      externalLink: "https://open.spotify.com/track/2kuTmskJFZW1L3FMMJFSFp",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Handy Man",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "handyman|0vn7UBvSQECKJm2817Yf1P|211533",
  song: "song/james-taylor-handy-man",
} as const satisfies Track
