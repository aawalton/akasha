import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeTroubleInTown = {
  id: "01a0b9ee-cf2a-766e-aefc-a761ae2d5df6",
  type: "page-type/track",
  slug: "coldplay-everyday-life-trouble-in-town",
  ownLength: 4.648433333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-everyday-life"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "45PqOIkZ9PdCjsCJQYzx9G",
      externalLink: "https://open.spotify.com/track/45PqOIkZ9PdCjsCJQYzx9G",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Trouble In Town",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "troubleintown|4gzpq5DPGxSnKTe4SA8HAU|278906",
  song: "song/coldplay-trouble-in-town",
} as const satisfies Track
