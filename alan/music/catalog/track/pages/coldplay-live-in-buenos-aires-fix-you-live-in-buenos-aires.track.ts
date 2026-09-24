import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresFixYouLiveInBuenosAires = {
  id: "01a0b9ee-d34f-776a-9bbf-dad320df43a0",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-fix-you-live-in-buenos-aires",
  ownLength: 5.457766666666667,
  ownProgress: 5.457766666666667,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  status: "completed",
  unit: "unit/minutes",
  title: "Fix You - Live in Buenos Aires",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "fixyouliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|327466",
  song: "song/coldplay-fix-you",
  carriedBy: [
    {
      release: "release/coldplay-live-in-buenos-aires",
      discNumber: 1,
      position: 14,
      externalId: "7mGJlNOAOmJ5ptkmujg1Gv",
      externalLink: "https://open.spotify.com/track/7mGJlNOAOmJ5ptkmujg1Gv",
    },
  ],
} as const satisfies Track
