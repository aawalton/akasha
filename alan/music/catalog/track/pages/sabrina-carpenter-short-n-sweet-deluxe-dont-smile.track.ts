import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetDeluxeDontSmile = {
  id: "01a0b111-1e7a-7820-817a-2a2acdbdebea",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-deluxe-dont-smile",
  ownLength: 3.4388833333333335,
  ownProgress: 3.4388833333333335,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Don’t Smile",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "dontsmile|74KM79TiuVKeVCqs8QtB0B|206333",
  song: "song/sabrina-carpenter-dont-smile",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-short-n-sweet-deluxe",
      discNumber: 1,
      position: 12,
      externalId: "0LB0SY2DW67uRjbDWcAHMZ",
      externalLink: "https://open.spotify.com/track/0LB0SY2DW67uRjbDWcAHMZ",
    },
  ],
} as const satisfies Track
