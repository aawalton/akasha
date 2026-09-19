import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2AmericanStandardMyHeartStoodStill = {
  id: "01a0abeb-2f58-7835-ad8e-b75e0473a406",
  type: "page-type/track",
  slug: "james-taylor-2-american-standard-my-heart-stood-still",
  ownLength: 3.4508833333333335,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-american-standard"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5NbEQEE3DUOVVyeD1VyHIL",
      externalLink: "https://open.spotify.com/track/5NbEQEE3DUOVVyeD1VyHIL",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "My Heart Stood Still",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "myheartstoodstill|0vn7UBvSQECKJm2817Yf1P|207053",
  song: "song/james-taylor-my-heart-stood-still",
} as const satisfies Track
