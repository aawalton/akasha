import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetDeluxeGoodGraces = {
  id: "01a0b111-1d33-739d-ab9f-5e5ed32b1214",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-deluxe-good-graces",
  ownLength: 3.0877666666666665,
  ownProgress: 3.0877666666666665,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Good Graces",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "goodgraces|74KM79TiuVKeVCqs8QtB0B|185266",
  song: "song/sabrina-carpenter-good-graces",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-short-n-sweet-deluxe",
      discNumber: 1,
      position: 3,
      externalId: "5JiTjhx7lhqYgsIGpo0VFy",
      externalLink: "https://open.spotify.com/track/5JiTjhx7lhqYgsIGpo0VFy",
    },
  ],
} as const satisfies Track
