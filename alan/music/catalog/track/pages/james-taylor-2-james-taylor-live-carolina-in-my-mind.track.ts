import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveCarolinaInMyMind = {
  id: "01a0abeb-3ed7-7dc2-966d-a105db4d2564",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-carolina-in-my-mind",
  ownLength: 5.0277666666666665,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Fv3LSqbgv5lrdClrc6XKc",
      externalLink: "https://open.spotify.com/track/2Fv3LSqbgv5lrdClrc6XKc",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Carolina In My Mind",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "carolinainmymind|0vn7UBvSQECKJm2817Yf1P|301666",
} as const satisfies Track
