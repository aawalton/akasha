import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ChillDeStressedOut = {
  id: "01a0afa1-e0d0-7eac-9df5-0b2418f9824b",
  type: "page-type/track",
  slug: "the-piano-guys-3-chill-de-stressed-out",
  ownLength: 3.0403166666666666,
  ownProgress: 3.0403166666666666,
  partOfCollections: ["release/the-piano-guys-3-chill"],
  status: "completed",
  unit: "unit/minutes",
  title: "(De)Stressed Out",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "destressedout|0jW6R8CVyVohuUJVcuweDI|182419",
  song: "song/the-piano-guys-de-stressed-out",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-chill",
      discNumber: 1,
      position: 4,
      externalId: "2F4bPSfiRgGWTX8vKO8Fk3",
      externalLink: "https://open.spotify.com/track/2F4bPSfiRgGWTX8vKO8Fk3",
    },
  ],
} as const satisfies Track
