import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3PerfectPerfect = {
  id: "01a0afa2-1e6b-7a26-af50-d469dba981ad",
  type: "page-type/track",
  slug: "the-piano-guys-3-perfect-perfect",
  ownLength: 5.179966666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-perfect"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2R0FW1n6cOkQDJhAkQENsf",
      externalLink: "https://open.spotify.com/track/2R0FW1n6cOkQDJhAkQENsf",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Perfect",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "perfect|0jW6R8CVyVohuUJVcuweDI|310798",
  song: "song/the-piano-guys-perfect",
} as const satisfies Track
