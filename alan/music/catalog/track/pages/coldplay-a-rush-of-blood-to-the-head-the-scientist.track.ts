import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayARushOfBloodToTheHeadTheScientist = {
  id: "01a0b9ee-e7f9-7128-92f8-945a018afab4",
  type: "page-type/track",
  slug: "coldplay-a-rush-of-blood-to-the-head-the-scientist",
  ownLength: 5.16,
  ownProgress: 5.16,
  partOfCollections: ["release/coldplay-a-rush-of-blood-to-the-head"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Scientist",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "thescientist|4gzpq5DPGxSnKTe4SA8HAU|309600",
  song: "song/coldplay-the-scientist",
  carriedBy: [
    {
      release: "release/coldplay-a-rush-of-blood-to-the-head",
      discNumber: 1,
      position: 4,
      externalId: "75JFxkI2RXiU7L9VXzMkle",
      externalLink: "https://open.spotify.com/track/75JFxkI2RXiU7L9VXzMkle",
    },
  ],
} as const satisfies Track
