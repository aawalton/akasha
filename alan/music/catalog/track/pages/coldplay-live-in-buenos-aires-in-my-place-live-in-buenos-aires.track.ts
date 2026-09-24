import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresInMyPlaceLiveInBuenosAires = {
  id: "01a0b9ee-d416-7c5b-a67f-3736c064cd63",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-in-my-place-live-in-buenos-aires",
  ownLength: 4.63,
  ownProgress: 4.63,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  status: "completed",
  unit: "unit/minutes",
  title: "In My Place - Live in Buenos Aires",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "inmyplaceliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|277800",
  song: "song/coldplay-in-my-place",
  carriedBy: [
    {
      release: "release/coldplay-live-in-buenos-aires",
      discNumber: 1,
      position: 19,
      externalId: "0o7htzPrB8bP0jnyjiqUdj",
      externalLink: "https://open.spotify.com/track/0o7htzPrB8bP0jnyjiqUdj",
    },
  ],
} as const satisfies Track
