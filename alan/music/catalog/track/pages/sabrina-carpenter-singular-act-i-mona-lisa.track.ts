import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSingularActIMonaLisa = {
  id: "01a0b111-26cf-7acc-ad47-31ae98930ac4",
  type: "page-type/track",
  slug: "sabrina-carpenter-singular-act-i-mona-lisa",
  ownLength: 2.30755,
  ownProgress: 2.30755,
  partOfCollections: ["release/sabrina-carpenter-singular-act-i"],
  status: "completed",
  unit: "unit/minutes",
  title: "Mona Lisa",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "monalisa|74KM79TiuVKeVCqs8QtB0B|138453",
  song: "song/sabrina-carpenter-mona-lisa",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-singular-act-i",
      discNumber: 1,
      position: 7,
      externalId: "7Gq4tfeuWPjr6WQiB7aBXz",
      externalLink: "https://open.spotify.com/track/7Gq4tfeuWPjr6WQiB7aBXz",
    },
  ],
} as const satisfies Track
