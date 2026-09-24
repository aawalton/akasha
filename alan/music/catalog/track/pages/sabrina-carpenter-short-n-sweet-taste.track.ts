import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetTaste = {
  id: "01a0b111-1f57-74e1-b2c0-3c1e8fe6716a",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-taste",
  ownLength: 2.6213166666666665,
  ownProgress: 2.6213166666666665,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet"],
  status: "completed",
  unit: "unit/minutes",
  title: "Taste",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "taste|74KM79TiuVKeVCqs8QtB0B|157279",
  song: "song/sabrina-carpenter-taste",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-short-n-sweet",
      discNumber: 1,
      position: 1,
      externalId: "5G2f63n7IPVPPjfNIGih7Q",
      externalLink: "https://open.spotify.com/track/5G2f63n7IPVPPjfNIGih7Q",
    },
  ],
} as const satisfies Track
