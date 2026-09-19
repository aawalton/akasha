import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayWishIWasHereWishIWasHere = {
  id: "01a0b9ee-f619-73d8-8401-094e9611db23",
  type: "page-type/track",
  slug: "coldplay-wish-i-was-here-wish-i-was-here",
  ownLength: 3.18155,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-wish-i-was-here"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "13doQ9lWZT2avl2iZJFV1b",
      externalLink: "https://open.spotify.com/track/13doQ9lWZT2avl2iZJFV1b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wish I Was Here",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "6G7OerKc3eBO9sVkRNopFC", artistName: "Cat Power" },
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
  ],
  trackKey: "wishiwashere|4gzpq5DPGxSnKTe4SA8HAU,6G7OerKc3eBO9sVkRNopFC|190893",
} as const satisfies Track
