import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSingularActIiTellEm = {
  id: "01a0b111-2583-7a4f-8a72-848926453e0e",
  type: "page-type/track",
  slug: "sabrina-carpenter-singular-act-ii-tell-em",
  ownLength: 4.674016666666667,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-singular-act-ii"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1CXLy7cfmAuxoIYcVM3wtK",
      externalLink: "https://open.spotify.com/track/1CXLy7cfmAuxoIYcVM3wtK",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Tell Em",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "tellem|74KM79TiuVKeVCqs8QtB0B|280441",
  song: "song/sabrina-carpenter-tell-em",
} as const satisfies Track
