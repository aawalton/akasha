import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveSweetBabyJames = {
  id: "01a0abeb-3bbe-7fd7-8f14-ffc350ba8ff3",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-sweet-baby-james",
  ownLength: 4.18955,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6sMFBGi63uil2HDqUEpCq3",
      externalLink: "https://open.spotify.com/track/6sMFBGi63uil2HDqUEpCq3",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Sweet Baby James",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "sweetbabyjames|0vn7UBvSQECKJm2817Yf1P|251373",
  song: "song/james-taylor-sweet-baby-james",
} as const satisfies Track
