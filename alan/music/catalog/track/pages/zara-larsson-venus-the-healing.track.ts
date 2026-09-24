import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonVenusTheHealing = {
  id: "01a0aa7c-2bf3-72ea-ba79-b6b0bf1446df",
  type: "page-type/track",
  slug: "zara-larsson-venus-the-healing",
  ownLength: 3.1827833333333335,
  ownProgress: 3.1827833333333335,
  partOfCollections: ["release/zara-larsson-venus"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Healing",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "thehealing|1Xylc3o4UrD53lo9CvFvVg|190967",
  song: "song/zara-larsson-the-healing",
  carriedBy: [
    {
      release: "release/zara-larsson-venus",
      discNumber: 1,
      position: 12,
      externalId: "7pDWvRIbO3fDbLMpFjuEtP",
      externalLink: "https://open.spotify.com/track/7pDWvRIbO3fDbLMpFjuEtP",
    },
  ],
} as const satisfies Track
