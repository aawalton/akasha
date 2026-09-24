import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonVenusNothing = {
  id: "01a0aa7c-2b6e-72ab-8aea-697e80592b65",
  type: "page-type/track",
  slug: "zara-larsson-venus-nothing",
  ownLength: 2.790766666666667,
  ownProgress: 2.790766666666667,
  partOfCollections: ["release/zara-larsson-venus"],
  status: "completed",
  unit: "unit/minutes",
  title: "Nothing",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "nothing|1Xylc3o4UrD53lo9CvFvVg|167446",
  song: "song/zara-larsson-nothing",
  carriedBy: [
    {
      release: "release/zara-larsson-venus",
      discNumber: 1,
      position: 8,
      externalId: "0Ad5NnoiNqgo21DAowasAO",
      externalLink: "https://open.spotify.com/track/0Ad5NnoiNqgo21DAowasAO",
    },
  ],
} as const satisfies Track
