import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2LiveAtTheTroubadourCountryRoadLiveAtTheTroubadour2007 = {
  id: "01a0abeb-31fc-7b61-8f60-0449f484e2da",
  type: "page-type/track",
  slug: "james-taylor-2-live-at-the-troubadour-country-road-live-at-the-troubadour-2007",
  ownLength: 3.8171,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-live-at-the-troubadour"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6WF8qmRCnjEMDugZPjJlPE",
      externalLink: "https://open.spotify.com/track/6WF8qmRCnjEMDugZPjJlPE",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Country Road - Live At The Troubadour / 2007",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "319yZVtYM9MBGqmSQnMyY6", artistName: "Carole King" },
    { externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" },
  ],
  trackKey:
    "countryroadliveatthetroubadour2007|0vn7UBvSQECKJm2817Yf1P,319yZVtYM9MBGqmSQnMyY6|229026",
  song: "song/james-taylor-country-road",
} as const satisfies Track
