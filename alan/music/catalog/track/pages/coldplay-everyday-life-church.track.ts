import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeChurch = {
  id: "01a0b9ee-ceff-7bab-9a39-755c857c45a5",
  type: "page-type/track",
  slug: "coldplay-everyday-life-church",
  ownLength: 3.83355,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-everyday-life"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1e8D1BCD2afT56Km7UahpB",
      externalLink: "https://open.spotify.com/track/1e8D1BCD2afT56Km7UahpB",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Church",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "church|4gzpq5DPGxSnKTe4SA8HAU|230013",
} as const satisfies Track
