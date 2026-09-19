import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEspressoEpEspresso = {
  id: "01a0b111-2b96-724d-86ad-9d31cbbfecc5",
  type: "page-type/track",
  slug: "sabrina-carpenter-espresso-ep-espresso",
  ownLength: 2.9243166666666665,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-espresso-ep"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6ev5nHxXH1R6CSgxHSEqHN",
      externalLink: "https://open.spotify.com/track/6ev5nHxXH1R6CSgxHSEqHN",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Espresso",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "espresso|74KM79TiuVKeVCqs8QtB0B|175459",
  song: "song/sabrina-carpenter-espresso",
} as const satisfies Track
