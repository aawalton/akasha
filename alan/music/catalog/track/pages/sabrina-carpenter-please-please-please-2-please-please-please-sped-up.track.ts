import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterPleasePleasePlease2PleasePleasePleaseSpedUp = {
  id: "01a0b111-2a5f-7a29-bf6d-3e18e97998dd",
  type: "page-type/track",
  slug: "sabrina-carpenter-please-please-please-2-please-please-please-sped-up",
  ownLength: 2.54005,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-please-please-please-2"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4EryTXqW5cvf5yqITZEm7b",
      externalLink: "https://open.spotify.com/track/4EryTXqW5cvf5yqITZEm7b",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Please Please Please - Sped Up",
  trackType: "version",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "pleasepleasepleasespedup|74KM79TiuVKeVCqs8QtB0B|152403",
  song: "song/sabrina-carpenter-please-please-please",
} as const satisfies Track
