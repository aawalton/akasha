import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterWhyAcousticWhyAcoustic = {
  id: "01a0b111-324d-75d2-bd26-62eb4c93e2d7",
  type: "page-type/track",
  slug: "sabrina-carpenter-why-acoustic-why-acoustic",
  ownLength: 3.075,
  ownProgress: 3.075,
  partOfCollections: ["release/sabrina-carpenter-why-acoustic"],
  status: "completed",
  unit: "unit/minutes",
  title: "Why - Acoustic",
  trackType: "acoustic",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "whyacoustic|74KM79TiuVKeVCqs8QtB0B|184500",
  song: "song/sabrina-carpenter-why",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-why-acoustic",
      discNumber: 1,
      position: 1,
      externalId: "5XdU66WYiYmqe1mBPepVAQ",
      externalLink: "https://open.spotify.com/track/5XdU66WYiYmqe1mBPepVAQ",
    },
  ],
} as const satisfies Track
