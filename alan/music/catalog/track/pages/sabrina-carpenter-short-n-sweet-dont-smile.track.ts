import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetDontSmile = {
  id: "01a0b111-20fb-7688-8037-1c98f79978b0",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-dont-smile",
  ownLength: 3.43825,
  ownProgress: 3.43825,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet"],
  status: "completed",
  unit: "unit/minutes",
  title: "Don’t Smile",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "dontsmile|74KM79TiuVKeVCqs8QtB0B|206295",
  song: "song/sabrina-carpenter-dont-smile",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-short-n-sweet",
      discNumber: 1,
      position: 12,
      externalId: "09LrGvT9KsACH66RHYMDyR",
      externalLink: "https://open.spotify.com/track/09LrGvT9KsACH66RHYMDyR",
    },
  ],
} as const satisfies Track
