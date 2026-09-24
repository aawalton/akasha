import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresUpUpLiveInBuenosAires = {
  id: "01a0b9ee-d4b5-7fd3-b33b-db97d3376976",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-up-up-live-in-buenos-aires",
  ownLength: 8.761766666666666,
  ownProgress: 8.761766666666666,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  status: "completed",
  unit: "unit/minutes",
  title: "Up&Up - Live in Buenos Aires",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "upupliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|525706",
  song: "song/coldplay-up-up",
  carriedBy: [
    {
      release: "release/coldplay-live-in-buenos-aires",
      discNumber: 1,
      position: 23,
      externalId: "3glegOEXSkk8HanJe7ZB08",
      externalLink: "https://open.spotify.com/track/3glegOEXSkk8HanJe7ZB08",
    },
  ],
} as const satisfies Track
