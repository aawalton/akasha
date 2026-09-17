import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEvolutionDontWantItBack = {
  id: "01a0b111-27d7-7c15-a5a2-48b548fb5d1e",
  type: "page-type/track",
  slug: "sabrina-carpenter-evolution-dont-want-it-back",
  ownLength: 3.030883333333333,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-evolution"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2yqhHi9QfZ5INE13sS5Bva",
      externalLink: "https://open.spotify.com/track/2yqhHi9QfZ5INE13sS5Bva",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Don't Want It Back",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "dontwantitback|74KM79TiuVKeVCqs8QtB0B|181853",
} as const satisfies Track
