import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSingularActIDiamondsAreForever = {
  id: "01a0b111-26ee-7b98-892e-30c7b7ec6cdf",
  type: "page-type/track",
  slug: "sabrina-carpenter-singular-act-i-diamonds-are-forever",
  ownLength: 3.82555,
  ownProgress: 3.82555,
  partOfCollections: ["release/sabrina-carpenter-singular-act-i"],
  status: "completed",
  unit: "unit/minutes",
  title: "Diamonds Are Forever",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "diamondsareforever|74KM79TiuVKeVCqs8QtB0B|229533",
  song: "song/sabrina-carpenter-diamonds-are-forever",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-singular-act-i",
      discNumber: 1,
      position: 8,
      externalId: "2KTdmzSdPipwFYdUdilmi3",
      externalLink: "https://open.spotify.com/track/2KTdmzSdPipwFYdUdilmi3",
    },
  ],
} as const satisfies Track
