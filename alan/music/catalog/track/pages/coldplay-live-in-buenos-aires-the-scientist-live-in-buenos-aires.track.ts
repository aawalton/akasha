import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresTheScientistLiveInBuenosAires = {
  id: "01a0b9ee-d1ca-7afd-ba8e-e35ba35b5d1e",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-the-scientist-live-in-buenos-aires",
  ownLength: 6.476666666666667,
  ownProgress: 6.476666666666667,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Scientist - Live in Buenos Aires",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "thescientistliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|388600",
  song: "song/coldplay-the-scientist",
  carriedBy: [
    {
      release: "release/coldplay-live-in-buenos-aires",
      discNumber: 1,
      position: 4,
      externalId: "1aZhbOdRqshLS6uPjiO8Y4",
      externalLink: "https://open.spotify.com/track/1aZhbOdRqshLS6uPjiO8Y4",
    },
  ],
} as const satisfies Track
