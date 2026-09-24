import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetGoodGraces = {
  id: "01a0b111-1fa4-738e-9c08-4cf858b76557",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-good-graces",
  ownLength: 3.08775,
  ownProgress: 3.08775,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet"],
  status: "completed",
  unit: "unit/minutes",
  title: "Good Graces",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "goodgraces|74KM79TiuVKeVCqs8QtB0B|185265",
  song: "song/sabrina-carpenter-good-graces",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-short-n-sweet",
      discNumber: 1,
      position: 3,
      externalId: "102YUQbYmwdBXS7jwamI90",
      externalLink: "https://open.spotify.com/track/102YUQbYmwdBXS7jwamI90",
    },
  ],
} as const satisfies Track
