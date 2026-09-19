import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2ThatSWhyIMHereEveryday = {
  id: "01a0abeb-4269-7f39-b9af-5630275c7085",
  type: "page-type/track",
  slug: "james-taylor-2-that-s-why-i-m-here-everyday",
  ownLength: 3.232666666666667,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-that-s-why-i-m-here"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4fqlTmlufMMWMBWxbLywKl",
      externalLink: "https://open.spotify.com/track/4fqlTmlufMMWMBWxbLywKl",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Everyday",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "everyday|0vn7UBvSQECKJm2817Yf1P|193960",
  song: "song/james-taylor-everyday",
} as const satisfies Track
