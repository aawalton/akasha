import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterFruitcakeCindyLouWho = {
  id: "01a0b111-2cf7-7f55-825d-71a091320c96",
  type: "page-type/track",
  slug: "sabrina-carpenter-fruitcake-cindy-lou-who",
  ownLength: 2.022666666666667,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-fruitcake"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "15WQ0CnYIbWNCWvwp7IlYr",
      externalLink: "https://open.spotify.com/track/15WQ0CnYIbWNCWvwp7IlYr",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "cindy lou who",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "cindylouwho|74KM79TiuVKeVCqs8QtB0B|121360",
  song: "song/sabrina-carpenter-cindy-lou-who",
} as const satisfies Track
