import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSueMeRemixesSueMeMarianHillRemix = {
  id: "01a0b111-3092-71b1-9864-83fbe0ef1301",
  type: "page-type/track",
  slug: "sabrina-carpenter-sue-me-remixes-sue-me-marian-hill-remix",
  ownLength: 3.6140333333333334,
  ownProgress: 3.6140333333333334,
  partOfCollections: ["release/sabrina-carpenter-sue-me-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sue Me - Marian Hill Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }, { artistName: "Marian Hill" }],
  trackKey: "suememarianhillremix|1xHQO9GJIW9OXHxGBISYc5,74KM79TiuVKeVCqs8QtB0B|216842",
  song: "song/sabrina-carpenter-sue-me",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-sue-me-remixes",
      discNumber: 1,
      position: 4,
      externalId: "2zAqDXHqTTcTDXgxPsA4DH",
      externalLink: "https://open.spotify.com/track/2zAqDXHqTTcTDXgxPsA4DH",
    },
  ],
} as const satisfies Track
