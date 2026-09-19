import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2FlagUpOnTheRoof = {
  id: "01a0abeb-457d-76eb-865d-5d4ebcde9d0b",
  type: "page-type/track",
  slug: "james-taylor-2-flag-up-on-the-roof",
  ownLength: 4.334433333333333,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-flag"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2mFTBNC08f6Jfre31ynXlw",
      externalLink: "https://open.spotify.com/track/2mFTBNC08f6Jfre31ynXlw",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Up On The Roof",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "upontheroof|0vn7UBvSQECKJm2817Yf1P|260066",
  song: "song/james-taylor-up-on-the-roof",
} as const satisfies Track
