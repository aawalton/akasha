import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonVenusMoreThanThisWas = {
  id: "01a0aa7c-2a8f-704e-8511-10b962e20720",
  type: "page-type/track",
  slug: "zara-larsson-venus-more-than-this-was",
  ownLength: 3.230916666666667,
  ownProgress: 3.230916666666667,
  partOfCollections: ["release/zara-larsson-venus"],
  status: "completed",
  unit: "unit/minutes",
  title: "More Than This Was",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "morethanthiswas|1Xylc3o4UrD53lo9CvFvVg|193855",
  song: "song/zara-larsson-more-than-this-was",
  carriedBy: [
    {
      release: "release/zara-larsson-venus",
      discNumber: 1,
      position: 2,
      externalId: "6CwrlA656MPLMRFgZZsvuD",
      externalLink: "https://open.spotify.com/track/6CwrlA656MPLMRFgZZsvuD",
    },
  ],
} as const satisfies Track
