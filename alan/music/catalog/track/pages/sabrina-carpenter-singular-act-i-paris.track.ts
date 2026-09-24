import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSingularActIParis = {
  id: "01a0b111-2631-7130-a21d-91d79fbfc811",
  type: "page-type/track",
  slug: "sabrina-carpenter-singular-act-i-paris",
  ownLength: 3.6346666666666665,
  ownProgress: 3.6346666666666665,
  partOfCollections: ["release/sabrina-carpenter-singular-act-i"],
  status: "completed",
  unit: "unit/minutes",
  title: "Paris",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "paris|74KM79TiuVKeVCqs8QtB0B|218080",
  song: "song/sabrina-carpenter-paris",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-singular-act-i",
      discNumber: 1,
      position: 2,
      externalId: "359HNzfOXhCMHB1pNKhyfH",
      externalLink: "https://open.spotify.com/track/359HNzfOXhCMHB1pNKhyfH",
    },
  ],
} as const satisfies Track
