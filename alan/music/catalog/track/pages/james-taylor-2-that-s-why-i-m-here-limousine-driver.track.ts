import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2ThatSWhyIMHereLimousineDriver = {
  id: "01a0abeb-428d-772f-a2d2-ef26550bfd9c",
  type: "page-type/track",
  slug: "james-taylor-2-that-s-why-i-m-here-limousine-driver",
  ownLength: 3.82555,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-that-s-why-i-m-here"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0y1wf0JkZFfCUMPX5td0wW",
      externalLink: "https://open.spotify.com/track/0y1wf0JkZFfCUMPX5td0wW",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Limousine Driver",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "limousinedriver|0vn7UBvSQECKJm2817Yf1P|229533",
  song: "song/james-taylor-limousine-driver",
} as const satisfies Track
