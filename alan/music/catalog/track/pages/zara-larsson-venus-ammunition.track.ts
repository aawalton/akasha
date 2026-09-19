import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonVenusAmmunition = {
  id: "01a0aa7c-2ad3-7038-9545-7417252acafe",
  type: "page-type/track",
  slug: "zara-larsson-venus-ammunition",
  ownLength: 3.70815,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-venus"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "16gu3zjAEer6t6c8qxaltf",
      externalLink: "https://open.spotify.com/track/16gu3zjAEer6t6c8qxaltf",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Ammunition",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "ammunition|1Xylc3o4UrD53lo9CvFvVg|222489",
  song: "song/zara-larsson-ammunition",
} as const satisfies Track
