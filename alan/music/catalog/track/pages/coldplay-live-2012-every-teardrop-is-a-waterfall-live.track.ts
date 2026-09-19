import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2012EveryTeardropIsAWaterfallLive = {
  id: "01a0b9ee-dbc1-78e7-9905-a60e3d4c57cf",
  type: "page-type/track",
  slug: "coldplay-live-2012-every-teardrop-is-a-waterfall-live",
  ownLength: 5.4051,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-2012"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3nbAuEdSqBVF5m2QwVYlzR",
      externalLink: "https://open.spotify.com/track/3nbAuEdSqBVF5m2QwVYlzR",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Every Teardrop Is a Waterfall - Live",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "everyteardropisawaterfalllive|4gzpq5DPGxSnKTe4SA8HAU|324306",
  song: "song/coldplay-every-teardrop-is-a-waterfall",
} as const satisfies Track
