import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetCoincidence = {
  id: "01a0b111-1ff5-70fc-8008-6b402bb8754c",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-coincidence",
  ownLength: 2.7367,
  ownProgress: 2.7367,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet"],
  status: "completed",
  unit: "unit/minutes",
  title: "Coincidence",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "coincidence|74KM79TiuVKeVCqs8QtB0B|164202",
  song: "song/sabrina-carpenter-coincidence",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-short-n-sweet",
      discNumber: 1,
      position: 5,
      externalId: "5oIVNm56t6OIf9ZjdEG3ud",
      externalLink: "https://open.spotify.com/track/5oIVNm56t6OIf9ZjdEG3ud",
    },
  ],
} as const satisfies Track
