import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTalk2Gravity = {
  id: "01a0b9ee-fe8f-766c-bee1-bbc07ae80121",
  type: "page-type/track",
  slug: "coldplay-talk-2-gravity",
  ownLength: 6.3491,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-talk-2"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "44LVgFZvUcBYo98vy71tvd",
      externalLink: "https://open.spotify.com/track/44LVgFZvUcBYo98vy71tvd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Gravity",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "gravity|4gzpq5DPGxSnKTe4SA8HAU|380946",
  song: "song/coldplay-gravity",
} as const satisfies Track
