import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSingularActIiTakeYouBack = {
  id: "01a0b111-25ca-7753-b879-aee8dc295de5",
  type: "page-type/track",
  slug: "sabrina-carpenter-singular-act-ii-take-you-back",
  ownLength: 2.817633333333333,
  ownProgress: 2.817633333333333,
  partOfCollections: ["release/sabrina-carpenter-singular-act-ii"],
  status: "completed",
  unit: "unit/minutes",
  title: "Take You Back",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "takeyouback|74KM79TiuVKeVCqs8QtB0B|169058",
  song: "song/sabrina-carpenter-take-you-back",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-singular-act-ii",
      discNumber: 1,
      position: 8,
      externalId: "1NF9ux53nctr5Rjb3c8i7D",
      externalLink: "https://open.spotify.com/track/1NF9ux53nctr5Rjb3c8i7D",
    },
  ],
} as const satisfies Track
