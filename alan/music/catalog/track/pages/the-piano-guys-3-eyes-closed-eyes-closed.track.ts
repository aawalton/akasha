import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3EyesClosedEyesClosed = {
  id: "01a0afa1-ead0-7203-8f14-3aaffcc6e7e0",
  type: "page-type/track",
  slug: "the-piano-guys-3-eyes-closed-eyes-closed",
  ownLength: 4.0759,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-eyes-closed"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4XZ21h3GvuSwjZthlXQ5T7",
      externalLink: "https://open.spotify.com/track/4XZ21h3GvuSwjZthlXQ5T7",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Eyes Closed",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "eyesclosed|0jW6R8CVyVohuUJVcuweDI|244554",
  song: "song/the-piano-guys-eyes-closed",
} as const satisfies Track
