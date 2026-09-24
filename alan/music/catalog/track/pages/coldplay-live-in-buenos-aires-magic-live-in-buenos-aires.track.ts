import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresMagicLiveInBuenosAires = {
  id: "01a0b9ee-d268-7ad7-8abe-edc763eb8320",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-magic-live-in-buenos-aires",
  ownLength: 4.764,
  ownProgress: 4.764,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  status: "completed",
  unit: "unit/minutes",
  title: "Magic - Live in Buenos Aires",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "magicliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|285840",
  song: "song/coldplay-magic",
  carriedBy: [
    {
      release: "release/coldplay-live-in-buenos-aires",
      discNumber: 1,
      position: 8,
      externalId: "6EqxH0njjZuuI3gFZN3Z1o",
      externalLink: "https://open.spotify.com/track/6EqxH0njjZuuI3gFZN3Z1o",
    },
  ],
} as const satisfies Track
