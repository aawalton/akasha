import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2LiveAtTheTroubadourFireAndRainLiveAtTheTroubadour2007 = {
  id: "01a0abeb-321a-7f64-85da-f94d442287c2",
  type: "page-type/track",
  slug: "james-taylor-2-live-at-the-troubadour-fire-and-rain-live-at-the-troubadour-2007",
  ownLength: 5.745333333333333,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-live-at-the-troubadour"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1YrrJ55wVGkpgEds42meUC",
      externalLink: "https://open.spotify.com/track/1YrrJ55wVGkpgEds42meUC",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Fire And Rain - Live At The Troubadour / 2007",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "319yZVtYM9MBGqmSQnMyY6", artistName: "Carole King" },
    { externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" },
  ],
  trackKey:
    "fireandrainliveatthetroubadour2007|0vn7UBvSQECKJm2817Yf1P,319yZVtYM9MBGqmSQnMyY6|344720",
  song: "song/james-taylor-fire-and-rain",
} as const satisfies Track
