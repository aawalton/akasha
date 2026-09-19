import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NewMoonShineOhBrother = {
  id: "01a0abeb-405a-7cee-aa7e-83e3bd559655",
  type: "page-type/track",
  slug: "james-taylor-2-new-moon-shine-oh-brother",
  ownLength: 4.387333333333333,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-new-moon-shine"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3JzFww5xW3CDGAN6JbELbI",
      externalLink: "https://open.spotify.com/track/3JzFww5xW3CDGAN6JbELbI",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Oh Brother",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "ohbrother|0vn7UBvSQECKJm2817Yf1P|263240",
  song: "song/james-taylor-oh-brother",
} as const satisfies Track
