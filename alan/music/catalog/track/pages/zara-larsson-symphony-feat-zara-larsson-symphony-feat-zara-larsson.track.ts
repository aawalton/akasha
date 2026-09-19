import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonSymphonyFeatZaraLarssonSymphonyFeatZaraLarsson = {
  id: "01a0aa7c-410f-7f84-b507-1da0a5e64c1b",
  type: "page-type/track",
  slug: "zara-larsson-symphony-feat-zara-larsson-symphony-feat-zara-larsson",
  ownLength: 3.540983333333333,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-symphony-feat-zara-larsson"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1x5sYLZiu9r5E43kMlt9f8",
      externalLink: "https://open.spotify.com/track/1x5sYLZiu9r5E43kMlt9f8",
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
  trackKey: "symphonyfeatzaralarsson|1Xylc3o4UrD53lo9CvFvVg,6MDME20pz9RveH9rEXvrOM|212459",
  song: "song/zara-larsson-symphony",
} as const satisfies Track
