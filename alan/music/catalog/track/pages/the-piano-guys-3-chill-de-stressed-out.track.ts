import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ChillDeStressedOut = {
  id: "01a0afa1-e0d0-7eac-9df5-0b2418f9824b",
  type: "page-type/track",
  slug: "the-piano-guys-3-chill-de-stressed-out",
  ownLength: 3.0403166666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-chill"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2F4bPSfiRgGWTX8vKO8Fk3",
      externalLink: "https://open.spotify.com/track/2F4bPSfiRgGWTX8vKO8Fk3",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "(De)Stressed Out",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "destressedout|0jW6R8CVyVohuUJVcuweDI|182419",
  song: "song/the-piano-guys-de-stressed-out",
} as const satisfies Track
