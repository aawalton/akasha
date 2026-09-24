import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresEverglowLiveInBuenosAires = {
  id: "01a0b9ee-d295-7b88-9c99-39df9254888b",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-everglow-live-in-buenos-aires",
  ownLength: 4.922883333333333,
  ownProgress: 4.922883333333333,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  status: "completed",
  unit: "unit/minutes",
  title: "Everglow - Live in Buenos Aires",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "everglowliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|295373",
  song: "song/coldplay-everglow",
  carriedBy: [
    {
      release: "release/coldplay-live-in-buenos-aires",
      discNumber: 1,
      position: 9,
      externalId: "4U5Cr41d1K6s48GAndvCdM",
      externalLink: "https://open.spotify.com/track/4U5Cr41d1K6s48GAndvCdM",
    },
  ],
} as const satisfies Track
