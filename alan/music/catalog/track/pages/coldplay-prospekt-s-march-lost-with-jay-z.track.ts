import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayProspektSMarchLostWithJayZ = {
  id: "01a0b9ee-fcad-700b-a1fe-6bfd446a7114",
  type: "page-type/track",
  slug: "coldplay-prospekt-s-march-lost-with-jay-z",
  ownLength: 4.2818,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-prospekt-s-march"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1GAsLXwdWOU0fOHY9rJVc8",
      externalLink: "https://open.spotify.com/track/1GAsLXwdWOU0fOHY9rJVc8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lost+ (with Jay-Z)",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "lostwithjayz|4gzpq5DPGxSnKTe4SA8HAU|256908",
  song: "song/coldplay-lost",
} as const satisfies Track
