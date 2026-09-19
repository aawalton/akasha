import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveSecretOLife = {
  id: "01a0abeb-3c3f-708c-bd66-46fe2c1296ae",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-secret-o-life",
  ownLength: 3.7662166666666668,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2dBOatuBZV3zYngZLAEbrv",
      externalLink: "https://open.spotify.com/track/2dBOatuBZV3zYngZLAEbrv",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Secret O' Life",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "secretolife|0vn7UBvSQECKJm2817Yf1P|225973",
  song: "song/james-taylor-secret-o-life",
} as const satisfies Track
