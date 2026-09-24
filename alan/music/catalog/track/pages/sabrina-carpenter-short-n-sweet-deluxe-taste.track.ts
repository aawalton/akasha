import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetDeluxeTaste = {
  id: "01a0b111-1ced-7809-a7b5-530872d36cb6",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-deluxe-taste",
  ownLength: 2.6213333333333333,
  ownProgress: 2.6213333333333333,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Taste",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "taste|74KM79TiuVKeVCqs8QtB0B|157280",
  song: "song/sabrina-carpenter-taste",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-short-n-sweet-deluxe",
      discNumber: 1,
      position: 1,
      externalId: "0lTDxglypMd8e8Q5hnmDnI",
      externalLink: "https://open.spotify.com/track/0lTDxglypMd8e8Q5hnmDnI",
    },
  ],
} as const satisfies Track
