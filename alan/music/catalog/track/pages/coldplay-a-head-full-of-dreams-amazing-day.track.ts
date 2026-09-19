import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayAHeadFullOfDreamsAmazingDay = {
  id: "01a0b9ee-d634-71d2-bcc0-5cce93954e7f",
  type: "page-type/track",
  slug: "coldplay-a-head-full-of-dreams-amazing-day",
  ownLength: 4.518433333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-a-head-full-of-dreams"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3wtV2ifnHzirkAElgTGh63",
      externalLink: "https://open.spotify.com/track/3wtV2ifnHzirkAElgTGh63",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Amazing Day",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "amazingday|4gzpq5DPGxSnKTe4SA8HAU|271106",
  song: "song/coldplay-amazing-day",
} as const satisfies Track
