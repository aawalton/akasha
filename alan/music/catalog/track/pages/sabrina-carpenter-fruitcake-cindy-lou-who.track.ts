import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterFruitcakeCindyLouWho = {
  id: "01a0b111-2cf7-7f55-825d-71a091320c96",
  type: "page-type/track",
  slug: "sabrina-carpenter-fruitcake-cindy-lou-who",
  ownLength: 2.022666666666667,
  ownProgress: 2.022666666666667,
  partOfCollections: ["release/sabrina-carpenter-fruitcake"],
  status: "completed",
  unit: "unit/minutes",
  title: "cindy lou who",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "cindylouwho|74KM79TiuVKeVCqs8QtB0B|121360",
  song: "song/sabrina-carpenter-cindy-lou-who",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-fruitcake",
      discNumber: 1,
      position: 4,
      externalId: "15WQ0CnYIbWNCWvwp7IlYr",
      externalLink: "https://open.spotify.com/track/15WQ0CnYIbWNCWvwp7IlYr",
    },
  ],
} as const satisfies Track
