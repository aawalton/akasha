import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayWishIWasHereWishIWasHere = {
  id: "01a0b9ee-f619-73d8-8401-094e9611db23",
  type: "page-type/track",
  slug: "coldplay-wish-i-was-here-wish-i-was-here",
  ownLength: 3.18155,
  ownProgress: 3.18155,
  partOfCollections: ["release/coldplay-wish-i-was-here"],
  status: "completed",
  unit: "unit/minutes",
  title: "Wish I Was Here",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Cat Power" }, { artist: "artist/coldplay" }],
  trackKey: "wishiwashere|4gzpq5DPGxSnKTe4SA8HAU,6G7OerKc3eBO9sVkRNopFC|190893",
  song: "song/coldplay-wish-i-was-here",
  carriedBy: [
    {
      release: "release/coldplay-wish-i-was-here",
      discNumber: 1,
      position: 1,
      externalId: "13doQ9lWZT2avl2iZJFV1b",
      externalLink: "https://open.spotify.com/track/13doQ9lWZT2avl2iZJFV1b",
    },
  ],
} as const satisfies Track
