import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterAlienAcousticAlienAcoustic = {
  id: "01a0b111-3164-7c00-95bf-d15c25e892a4",
  type: "page-type/track",
  slug: "sabrina-carpenter-alien-acoustic-alien-acoustic",
  ownLength: 3.4104833333333335,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-alien-acoustic"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6VDRCKWp49mhQhrvAeI5QT",
      externalLink: "https://open.spotify.com/track/6VDRCKWp49mhQhrvAeI5QT",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Alien - Acoustic",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" },
    { externalId: "1HBjj22wzbscIZ9sEb5dyf", artistName: "Jonas Blue" },
  ],
  trackKey: "alienacoustic|1HBjj22wzbscIZ9sEb5dyf,74KM79TiuVKeVCqs8QtB0B|204629",
  song: "song/sabrina-carpenter-alien",
} as const satisfies Track
