import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2LiveAtTheTroubadourItsTooLateLiveAtTheTroubadour2007 = {
  id: "01a0abeb-3185-7078-b06e-b728a65bcea9",
  type: "page-type/track",
  slug: "james-taylor-2-live-at-the-troubadour-its-too-late-live-at-the-troubadour-2007",
  ownLength: 4.984,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-live-at-the-troubadour"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2GUEXn64HZhMo6sdzjLPdg",
      externalLink: "https://open.spotify.com/track/2GUEXn64HZhMo6sdzjLPdg",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "It’s Too Late - Live At The Troubadour / 2007",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "319yZVtYM9MBGqmSQnMyY6", artistName: "Carole King" },
    { externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" },
  ],
  trackKey:
    "itstoolateliveatthetroubadour2007|0vn7UBvSQECKJm2817Yf1P,319yZVtYM9MBGqmSQnMyY6|299040",
  song: "song/james-taylor-its-too-late",
} as const satisfies Track
