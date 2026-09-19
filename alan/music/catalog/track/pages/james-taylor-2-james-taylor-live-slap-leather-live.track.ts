import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveSlapLeatherLive = {
  id: "01a0abeb-3e83-7312-92cb-327ffd9477fd",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-slap-leather-live",
  ownLength: 2.148216666666667,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "67tQdAHqvaXIx7wvlsFkoq",
      externalLink: "https://open.spotify.com/track/67tQdAHqvaXIx7wvlsFkoq",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Slap Leather - Live",
  trackType: "live",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "slapleatherlive|0vn7UBvSQECKJm2817Yf1P|128893",
  song: "song/james-taylor-slap-leather",
} as const satisfies Track
