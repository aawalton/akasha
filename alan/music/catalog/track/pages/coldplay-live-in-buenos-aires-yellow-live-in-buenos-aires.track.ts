import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresYellowLiveInBuenosAires = {
  id: "01a0b9ee-d179-746f-add2-3d4db248260d",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-yellow-live-in-buenos-aires",
  ownLength: 5.8411,
  ownProgress: 5.8411,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  status: "completed",
  unit: "unit/minutes",
  title: "Yellow - Live in Buenos Aires",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "yellowliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|350466",
  song: "song/coldplay-yellow",
  carriedBy: [
    {
      release: "release/coldplay-live-in-buenos-aires",
      discNumber: 1,
      position: 2,
      externalId: "2s2Ld1Xm7t88gSVvohNbPL",
      externalLink: "https://open.spotify.com/track/2s2Ld1Xm7t88gSVvohNbPL",
    },
  ],
} as const satisfies Track
