import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresEndCreditsLiveInBuenosAires = {
  id: "01a0b9ee-d4d7-7746-87ef-699896c3d6c1",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-end-credits-live-in-buenos-aires",
  ownLength: 2.054,
  ownProgress: 2.054,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  status: "completed",
  unit: "unit/minutes",
  title: "End Credits - Live in Buenos Aires",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "endcreditsliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|123240",
  song: "song/coldplay-end-credits",
  carriedBy: [
    {
      release: "release/coldplay-live-in-buenos-aires",
      discNumber: 1,
      position: 24,
      externalId: "6c64ANGY0NfO2YMpbcJUOR",
      externalLink: "https://open.spotify.com/track/6c64ANGY0NfO2YMpbcJUOR",
    },
  ],
} as const satisfies Track
