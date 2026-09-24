import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetDeluxeEspresso = {
  id: "01a0b111-1dc9-7e7e-9da5-6228f6ffc847",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-deluxe-espresso",
  ownLength: 2.9242166666666667,
  ownProgress: 2.9242166666666667,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Espresso",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "espresso|74KM79TiuVKeVCqs8QtB0B|175453",
  song: "song/sabrina-carpenter-espresso",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-short-n-sweet-deluxe",
      discNumber: 1,
      position: 7,
      externalId: "2LU2CYKUZUc1iAErxJb1dK",
      externalLink: "https://open.spotify.com/track/2LU2CYKUZUc1iAErxJb1dK",
    },
  ],
} as const satisfies Track
