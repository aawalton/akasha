import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetDeluxe15Minutes = {
  id: "01a0b111-1eab-7517-a2de-193e742cf745",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-deluxe-15-minutes",
  ownLength: 3.1919833333333334,
  ownProgress: 3.1919833333333334,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "15 Minutes",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "15minutes|74KM79TiuVKeVCqs8QtB0B|191519",
  song: "song/sabrina-carpenter-15-minutes",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-short-n-sweet-deluxe",
      discNumber: 1,
      position: 13,
      externalId: "1zhvxTuSha22nsUT5Nw8gE",
      externalLink: "https://open.spotify.com/track/1zhvxTuSha22nsUT5Nw8gE",
    },
  ],
} as const satisfies Track
