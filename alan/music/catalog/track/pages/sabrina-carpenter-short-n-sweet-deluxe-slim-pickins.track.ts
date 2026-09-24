import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetDeluxeSlimPickins = {
  id: "01a0b111-1e15-7663-9111-fbe6b0fe7ca3",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-deluxe-slim-pickins",
  ownLength: 2.5366666666666666,
  ownProgress: 2.5366666666666666,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Slim Pickins",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "slimpickins|74KM79TiuVKeVCqs8QtB0B|152200",
  song: "song/sabrina-carpenter-slim-pickins",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-short-n-sweet-deluxe",
      discNumber: 1,
      position: 9,
      externalId: "13djc4bqGG8n26PmsAuByA",
      externalLink: "https://open.spotify.com/track/13djc4bqGG8n26PmsAuByA",
    },
  ],
} as const satisfies Track
