import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3RollingInTheDeepRollingInTheDeepVocalVersion = {
  id: "01a0afa2-1f7b-7f83-a4c9-9ff60805e308",
  type: "page-type/track",
  slug: "the-piano-guys-3-rolling-in-the-deep-rolling-in-the-deep-vocal-version",
  ownLength: 4.016216666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-rolling-in-the-deep"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2N3Bp4QU3JeqqQiL2geJqV",
      externalLink: "https://open.spotify.com/track/2N3Bp4QU3JeqqQiL2geJqV",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Rolling in the Deep (vocal version)",
  trackType: "version",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
    { externalId: "29beZlklJNMaRN3MS40ZYq", artistName: "Amanda Scott" },
  ],
  trackKey: "rollinginthedeepvocalversion|0jW6R8CVyVohuUJVcuweDI,29beZlklJNMaRN3MS40ZYq|240973",
  song: "song/the-piano-guys-rolling-in-the-deep",
} as const satisfies Track
