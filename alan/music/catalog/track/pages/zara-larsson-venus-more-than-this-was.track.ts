import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonVenusMoreThanThisWas = {
  id: "01a0aa7c-2a8f-704e-8511-10b962e20720",
  type: "page-type/track",
  slug: "zara-larsson-venus-more-than-this-was",
  ownLength: 3.230916666666667,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-venus"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6CwrlA656MPLMRFgZZsvuD",
      externalLink: "https://open.spotify.com/track/6CwrlA656MPLMRFgZZsvuD",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "More Than This Was",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "morethanthiswas|1Xylc3o4UrD53lo9CvFvVg|193855",
  song: "song/zara-larsson-more-than-this-was",
} as const satisfies Track
