import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterPleasePleasePlease2PleasePleasePleaseInstrumental = {
  id: "01a0b111-2ac6-7dee-8b57-7080f49f5416",
  type: "page-type/track",
  slug: "sabrina-carpenter-please-please-please-2-please-please-please-instrumental",
  ownLength: 3.1028333333333333,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-please-please-please-2"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2BxIYKqZrXn2nMvK31cJEl",
      externalLink: "https://open.spotify.com/track/2BxIYKqZrXn2nMvK31cJEl",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Please Please Please - Instrumental",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "pleasepleasepleaseinstrumental|74KM79TiuVKeVCqs8QtB0B|186170",
  song: "song/sabrina-carpenter-please-please-please",
} as const satisfies Track
