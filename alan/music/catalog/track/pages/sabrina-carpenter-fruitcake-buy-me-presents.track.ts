import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterFruitcakeBuyMePresents = {
  id: "01a0b111-2cb1-77ba-bd1a-1aecdc51b13a",
  type: "page-type/track",
  slug: "sabrina-carpenter-fruitcake-buy-me-presents",
  ownLength: 2.9560833333333334,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-fruitcake"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Cz6MZdwncB4qasyRPen4S",
      externalLink: "https://open.spotify.com/track/3Cz6MZdwncB4qasyRPen4S",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "buy me presents",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "buymepresents|74KM79TiuVKeVCqs8QtB0B|177365",
  song: "song/sabrina-carpenter-buy-me-presents",
} as const satisfies Track
