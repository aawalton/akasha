import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetDeluxeJuno = {
  id: "01a0b111-1e33-7740-9b9d-13c593c539b3",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-deluxe-juno",
  ownLength: 3.7197666666666667,
  ownProgress: 3.7197666666666667,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Juno",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "juno|74KM79TiuVKeVCqs8QtB0B|223186",
  song: "song/sabrina-carpenter-juno",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-short-n-sweet-deluxe",
      discNumber: 1,
      position: 10,
      externalId: "0w1qp04v2zehJXctW0JPjy",
      externalLink: "https://open.spotify.com/track/0w1qp04v2zehJXctW0JPjy",
    },
  ],
} as const satisfies Track
