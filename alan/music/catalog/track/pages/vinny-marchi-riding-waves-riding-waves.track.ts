import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiRidingWavesRidingWaves = {
  id: "01a0b112-994f-7ce2-a9e9-3a8401849c70",
  type: "page-type/track",
  slug: "vinny-marchi-riding-waves-riding-waves",
  ownLength: 2.811183333333333,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-riding-waves"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2BWukQpMZk2o1TOLEqq8VB",
      externalLink: "https://open.spotify.com/track/2BWukQpMZk2o1TOLEqq8VB",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Riding Waves",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "ridingwaves|5USAMqcbMAzF3HBmeD5pJF|168671",
  song: "song/vinny-marchi-riding-waves",
} as const satisfies Track
