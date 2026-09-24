import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEyesWideOpenWhiteFlag = {
  id: "01a0b111-299c-7db1-a782-b4cfad8b3234",
  type: "page-type/track",
  slug: "sabrina-carpenter-eyes-wide-open-white-flag",
  ownLength: 3.306433333333333,
  ownProgress: 3.306433333333333,
  partOfCollections: ["release/sabrina-carpenter-eyes-wide-open"],
  status: "completed",
  unit: "unit/minutes",
  title: "White Flag",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "whiteflag|74KM79TiuVKeVCqs8QtB0B|198386",
  song: "song/sabrina-carpenter-white-flag",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-eyes-wide-open",
      discNumber: 1,
      position: 11,
      externalId: "6xQdHOX1Tq3IrKsQdLs0nc",
      externalLink: "https://open.spotify.com/track/6xQdHOX1Tq3IrKsQdLs0nc",
    },
  ],
} as const satisfies Track
