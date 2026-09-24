import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetLieToGirls = {
  id: "01a0b111-20dd-74fd-a199-cb29620efa48",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-lie-to-girls",
  ownLength: 3.3666833333333335,
  ownProgress: 3.3666833333333335,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet"],
  status: "completed",
  unit: "unit/minutes",
  title: "Lie To Girls",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "lietogirls|74KM79TiuVKeVCqs8QtB0B|202001",
  song: "song/sabrina-carpenter-lie-to-girls",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-short-n-sweet",
      discNumber: 1,
      position: 11,
      externalId: "5il0jwWUlvgtIzWvzJi12z",
      externalLink: "https://open.spotify.com/track/5il0jwWUlvgtIzWvzJi12z",
    },
  ],
} as const satisfies Track
