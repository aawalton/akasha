import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarsson1BadBoys = {
  id: "01a0aa7c-35d5-7488-8f65-04132cb39bcb",
  type: "page-type/track",
  slug: "zara-larsson-1-bad-boys",
  ownLength: 2.158,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-1"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "70u72FPeBl58rThfsRnZ4K",
      externalLink: "https://open.spotify.com/track/70u72FPeBl58rThfsRnZ4K",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Bad Boys",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "badboys|1Xylc3o4UrD53lo9CvFvVg|129480",
  song: "song/zara-larsson-bad-boys",
} as const satisfies Track
