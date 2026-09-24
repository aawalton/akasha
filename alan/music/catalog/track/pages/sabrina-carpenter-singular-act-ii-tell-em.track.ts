import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSingularActIiTellEm = {
  id: "01a0b111-2583-7a4f-8a72-848926453e0e",
  type: "page-type/track",
  slug: "sabrina-carpenter-singular-act-ii-tell-em",
  ownLength: 4.674016666666667,
  ownProgress: 4.674016666666667,
  partOfCollections: ["release/sabrina-carpenter-singular-act-ii"],
  status: "completed",
  unit: "unit/minutes",
  title: "Tell Em",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "tellem|74KM79TiuVKeVCqs8QtB0B|280441",
  song: "song/sabrina-carpenter-tell-em",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-singular-act-ii",
      discNumber: 1,
      position: 6,
      externalId: "1CXLy7cfmAuxoIYcVM3wtK",
      externalLink: "https://open.spotify.com/track/1CXLy7cfmAuxoIYcVM3wtK",
    },
  ],
} as const satisfies Track
