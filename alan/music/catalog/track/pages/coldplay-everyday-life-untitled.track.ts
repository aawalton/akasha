import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeUntitled = {
  id: "01a0b9ee-d0d7-75d4-89e6-b3b24d882c8d",
  type: "page-type/track",
  slug: "coldplay-everyday-life-untitled",
  ownLength: 3.2444333333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-everyday-life"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6DGzLNiawTtntC9NHzeMeY",
      externalLink: "https://open.spotify.com/track/6DGzLNiawTtntC9NHzeMeY",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "بنی آدم",
  trackType: "studio",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "|4gzpq5DPGxSnKTe4SA8HAU|194666",
  song: "song/coldplay-untitled-5",
} as const satisfies Track
