import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTheBlueRoomSuchARush = {
  id: "01a0b9ef-052b-75a5-8d3b-6216ab5c5fe2",
  type: "page-type/track",
  slug: "coldplay-the-blue-room-such-a-rush",
  ownLength: 4.9622166666666665,
  ownProgress: 4.9622166666666665,
  partOfCollections: ["release/coldplay-the-blue-room"],
  status: "completed",
  unit: "unit/minutes",
  title: "Such a Rush",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "sucharush|4gzpq5DPGxSnKTe4SA8HAU|297733",
  song: "song/coldplay-such-a-rush",
  carriedBy: [
    {
      release: "release/coldplay-the-blue-room",
      discNumber: 1,
      position: 5,
      externalId: "3c1NaLIIBoFof2nrDeUlc1",
      externalLink: "https://open.spotify.com/track/3c1NaLIIBoFof2nrDeUlc1",
    },
  ],
} as const satisfies Track
