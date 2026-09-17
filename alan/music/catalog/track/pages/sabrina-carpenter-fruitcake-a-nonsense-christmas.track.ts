import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterFruitcakeANonsenseChristmas = {
  id: "01a0b111-2c90-7490-97f8-bac920f3b5a8",
  type: "page-type/track",
  slug: "sabrina-carpenter-fruitcake-a-nonsense-christmas",
  ownLength: 2.55165,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-fruitcake"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "73ye7F9Ub51dQ3CrnCHFhr",
      externalLink: "https://open.spotify.com/track/73ye7F9Ub51dQ3CrnCHFhr",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "A Nonsense Christmas",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "anonsensechristmas|74KM79TiuVKeVCqs8QtB0B|153099",
} as const satisfies Track
