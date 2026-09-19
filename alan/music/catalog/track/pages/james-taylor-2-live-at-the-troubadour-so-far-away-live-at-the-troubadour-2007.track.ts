import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2LiveAtTheTroubadourSoFarAwayLiveAtTheTroubadour2007 = {
  id: "01a0abeb-312c-7ef0-918c-4a9deafcc217",
  type: "page-type/track",
  slug: "james-taylor-2-live-at-the-troubadour-so-far-away-live-at-the-troubadour-2007",
  ownLength: 4.7,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-live-at-the-troubadour"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "631GjjCfWKM0lq3lCY50sH",
      externalLink: "https://open.spotify.com/track/631GjjCfWKM0lq3lCY50sH",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "So Far Away - Live At The Troubadour / 2007",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "319yZVtYM9MBGqmSQnMyY6", artistName: "Carole King" },
    { externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" },
  ],
  trackKey: "sofarawayliveatthetroubadour2007|0vn7UBvSQECKJm2817Yf1P,319yZVtYM9MBGqmSQnMyY6|282000",
  song: "song/james-taylor-so-far-away",
} as const satisfies Track
