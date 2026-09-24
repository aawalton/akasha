import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonVenusSoundtrack = {
  id: "01a0aa7c-2bac-7ddb-80ab-30ddd9c6d5f1",
  type: "page-type/track",
  slug: "zara-larsson-venus-soundtrack",
  ownLength: 3.3849833333333335,
  ownProgress: 3.3849833333333335,
  partOfCollections: ["release/zara-larsson-venus"],
  status: "completed",
  unit: "unit/minutes",
  title: "Soundtrack",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "soundtrack|1Xylc3o4UrD53lo9CvFvVg|203099",
  song: "song/zara-larsson-soundtrack",
  carriedBy: [
    {
      release: "release/zara-larsson-venus",
      discNumber: 1,
      position: 10,
      externalId: "4CoavdV5PezJYz46loMF6q",
      externalLink: "https://open.spotify.com/track/4CoavdV5PezJYz46loMF6q",
    },
  ],
} as const satisfies Track
