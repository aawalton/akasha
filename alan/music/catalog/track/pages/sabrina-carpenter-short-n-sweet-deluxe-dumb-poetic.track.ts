import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetDeluxeDumbPoetic = {
  id: "01a0b111-1dee-79ce-a2e4-dea1dfa4c9f6",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-deluxe-dumb-poetic",
  ownLength: 2.224666666666667,
  ownProgress: 2.224666666666667,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Dumb & Poetic",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "dumbpoetic|74KM79TiuVKeVCqs8QtB0B|133480",
  song: "song/sabrina-carpenter-dumb-poetic",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-short-n-sweet-deluxe",
      discNumber: 1,
      position: 8,
      externalId: "1QBEAcc13ipZG7OvT2z2v1",
      externalLink: "https://open.spotify.com/track/1QBEAcc13ipZG7OvT2z2v1",
    },
  ],
} as const satisfies Track
