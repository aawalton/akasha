import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterFruitcakeIsItNewYearsYet = {
  id: "01a0b111-2d17-7df5-9da9-cdc7316955a7",
  type: "page-type/track",
  slug: "sabrina-carpenter-fruitcake-is-it-new-years-yet",
  ownLength: 2.643,
  ownProgress: 2.643,
  partOfCollections: ["release/sabrina-carpenter-fruitcake"],
  status: "completed",
  unit: "unit/minutes",
  title: "is it new years yet?",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "isitnewyearsyet|74KM79TiuVKeVCqs8QtB0B|158580",
  song: "song/sabrina-carpenter-is-it-new-years-yet",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-fruitcake",
      discNumber: 1,
      position: 5,
      externalId: "48xGcNwekbGcux5rIjKPQM",
      externalLink: "https://open.spotify.com/track/48xGcNwekbGcux5rIjKPQM",
    },
  ],
} as const satisfies Track
