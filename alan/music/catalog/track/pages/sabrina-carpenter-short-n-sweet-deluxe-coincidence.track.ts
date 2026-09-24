import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetDeluxeCoincidence = {
  id: "01a0b111-1d81-7bb9-a8f8-c7618a624cd7",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-deluxe-coincidence",
  ownLength: 2.736666666666667,
  ownProgress: 2.736666666666667,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Coincidence",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "coincidence|74KM79TiuVKeVCqs8QtB0B|164200",
  song: "song/sabrina-carpenter-coincidence",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-short-n-sweet-deluxe",
      discNumber: 1,
      position: 5,
      externalId: "7wJkgAZNkRMQz1FOMS5z6Y",
      externalLink: "https://open.spotify.com/track/7wJkgAZNkRMQz1FOMS5z6Y",
    },
  ],
} as const satisfies Track
