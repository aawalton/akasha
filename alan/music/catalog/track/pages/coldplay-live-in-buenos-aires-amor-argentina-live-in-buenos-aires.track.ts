import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresAmorArgentinaLiveInBuenosAires = {
  id: "01a0b9ee-d43d-720e-befa-ca0e4f53a90a",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-amor-argentina-live-in-buenos-aires",
  ownLength: 5.27,
  ownProgress: 5.27,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  status: "completed",
  unit: "unit/minutes",
  title: "Amor Argentina - Live in Buenos Aires",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "amorargentinaliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|316200",
  song: "song/coldplay-amor-argentina",
  carriedBy: [
    {
      release: "release/coldplay-live-in-buenos-aires",
      discNumber: 1,
      position: 20,
      externalId: "1rAZrYT0Ad4F1RiDaxYknE",
      externalLink: "https://open.spotify.com/track/1rAZrYT0Ad4F1RiDaxYknE",
    },
  ],
} as const satisfies Track
