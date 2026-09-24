import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonSoGoodAintMyFault = {
  id: "01a0aa7c-3378-7320-8741-34983ae3c3c2",
  type: "page-type/track",
  slug: "zara-larsson-so-good-aint-my-fault",
  ownLength: 3.74095,
  ownProgress: 3.74095,
  partOfCollections: ["release/zara-larsson-so-good"],
  status: "completed",
  unit: "unit/minutes",
  title: "Ain't My Fault",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "aintmyfault|1Xylc3o4UrD53lo9CvFvVg|224457",
  song: "song/zara-larsson-ain-t-my-fault",
  carriedBy: [
    {
      release: "release/zara-larsson-so-good",
      discNumber: 1,
      position: 11,
      externalId: "0ADG9OgdVTL7fgREP75BrZ",
      externalLink: "https://open.spotify.com/track/0ADG9OgdVTL7fgREP75BrZ",
    },
  ],
} as const satisfies Track
