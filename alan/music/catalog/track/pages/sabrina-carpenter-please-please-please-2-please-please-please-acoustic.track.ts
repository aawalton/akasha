import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterPleasePleasePlease2PleasePleasePleaseAcoustic = {
  id: "01a0b111-2a1f-7645-93dc-6f0cb38427e4",
  type: "page-type/track",
  slug: "sabrina-carpenter-please-please-please-2-please-please-please-acoustic",
  ownLength: 3.02475,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-please-please-please-2"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6g5I925i0ti3ajw2A6IXnQ",
      externalLink: "https://open.spotify.com/track/6g5I925i0ti3ajw2A6IXnQ",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Please Please Please - Acoustic",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "pleasepleasepleaseacoustic|74KM79TiuVKeVCqs8QtB0B|181485",
  song: "song/sabrina-carpenter-please-please-please",
} as const satisfies Track
