import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetSlimPickins = {
  id: "01a0b111-2093-7deb-8950-6edab40a1dd7",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-slim-pickins",
  ownLength: 2.536583333333333,
  ownProgress: 2.536583333333333,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet"],
  status: "completed",
  unit: "unit/minutes",
  title: "Slim Pickins",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "slimpickins|74KM79TiuVKeVCqs8QtB0B|152195",
  song: "song/sabrina-carpenter-slim-pickins",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-short-n-sweet",
      discNumber: 1,
      position: 9,
      externalId: "0XkZmBCCcdMY0EPY8ij6Gb",
      externalLink: "https://open.spotify.com/track/0XkZmBCCcdMY0EPY8ij6Gb",
    },
  ],
} as const satisfies Track
