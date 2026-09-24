import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEyesWideOpenTwoYoungHearts = {
  id: "01a0b111-28d1-721a-bd9e-bbdd453489fa",
  type: "page-type/track",
  slug: "sabrina-carpenter-eyes-wide-open-two-young-hearts",
  ownLength: 3.8933333333333335,
  ownProgress: 3.8933333333333335,
  partOfCollections: ["release/sabrina-carpenter-eyes-wide-open"],
  status: "completed",
  unit: "unit/minutes",
  title: "Two Young Hearts",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "twoyounghearts|74KM79TiuVKeVCqs8QtB0B|233600",
  song: "song/sabrina-carpenter-two-young-hearts",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-eyes-wide-open",
      discNumber: 1,
      position: 5,
      externalId: "47hRbUwwBU3E2wyIA8OE4x",
      externalLink: "https://open.spotify.com/track/47hRbUwwBU3E2wyIA8OE4x",
    },
  ],
} as const satisfies Track
