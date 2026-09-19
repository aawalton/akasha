import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonSoGoodSymphonyFeatZaraLarsson = {
  id: "01a0aa7c-33ff-76d0-902b-ade5748ad035",
  type: "page-type/track",
  slug: "zara-larsson-so-good-symphony-feat-zara-larsson",
  ownLength: 3.54255,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-so-good"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4SPLWgCPoKwULz2UTM8TKg",
      externalLink: "https://open.spotify.com/track/4SPLWgCPoKwULz2UTM8TKg",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Symphony (feat. Zara Larsson)",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "6MDME20pz9RveH9rEXvrOM", artistName: "Clean Bandit" },
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
  ],
  trackKey: "symphonyfeatzaralarsson|1Xylc3o4UrD53lo9CvFvVg,6MDME20pz9RveH9rEXvrOM|212553",
  song: "song/zara-larsson-symphony",
} as const satisfies Track
