import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterPleasePleasePlease2PleasePleasePlease2 = {
  id: "01a0b111-2a3f-7ea3-8bdd-c8820c8c6cee",
  type: "page-type/track",
  slug: "sabrina-carpenter-please-please-please-2-please-please-please-2",
  ownLength: 3.1028333333333333,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-please-please-please-2"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "76hOXBTfWSB1mZH99Hg5p4",
      externalLink: "https://open.spotify.com/track/76hOXBTfWSB1mZH99Hg5p4",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Please Please Please",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "pleasepleaseplease|74KM79TiuVKeVCqs8QtB0B|186170",
  song: "song/sabrina-carpenter-please-please-please",
} as const satisfies Track
