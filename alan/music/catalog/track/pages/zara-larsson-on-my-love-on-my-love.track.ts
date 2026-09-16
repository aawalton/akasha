import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonOnMyLoveOnMyLove = {
  id: "01a0aa7c-3965-73e6-b914-03eb55548da0",
  type: "page-type/track",
  slug: "zara-larsson-on-my-love-on-my-love",
  ownLength: 3.7151833333333335,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-on-my-love"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0dxp7DyPJEo6JhtnjUtBnN",
      externalLink: "https://open.spotify.com/track/0dxp7DyPJEo6JhtnjUtBnN",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "On My Love",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "1Cs0zKBU1kc0i8ypK3B9ai", artistName: "David Guetta" },
  ],
  trackKey: "onmylove|1Cs0zKBU1kc0i8ypK3B9ai,1Xylc3o4UrD53lo9CvFvVg|222911",
} as const satisfies Track
