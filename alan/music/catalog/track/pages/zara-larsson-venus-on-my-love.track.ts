import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonVenusOnMyLove = {
  id: "01a0aa7c-2ab2-7161-a528-ebeb997045f7",
  type: "page-type/track",
  slug: "zara-larsson-venus-on-my-love",
  ownLength: 3.7151833333333335,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-venus"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1ewzs8xG9P7wSZhpp8VCuy",
      externalLink: "https://open.spotify.com/track/1ewzs8xG9P7wSZhpp8VCuy",
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
