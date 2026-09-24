import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTheBlueRoomDontPanic = {
  id: "01a0b9ef-04ac-7c1b-bcf6-7fb4fcda007f",
  type: "page-type/track",
  slug: "coldplay-the-blue-room-dont-panic",
  ownLength: 2.640433333333333,
  ownProgress: 2.640433333333333,
  partOfCollections: ["release/coldplay-the-blue-room"],
  status: "completed",
  unit: "unit/minutes",
  title: "Don't Panic",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "dontpanic|4gzpq5DPGxSnKTe4SA8HAU|158426",
  song: "song/coldplay-dont-panic",
  carriedBy: [
    {
      release: "release/coldplay-the-blue-room",
      discNumber: 1,
      position: 2,
      externalId: "0MbCcvzLYu3xq6OgEkSbhC",
      externalLink: "https://open.spotify.com/track/0MbCcvzLYu3xq6OgEkSbhC",
    },
  ],
} as const satisfies Track
