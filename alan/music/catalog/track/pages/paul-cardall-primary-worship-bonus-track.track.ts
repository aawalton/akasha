import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPrimaryWorshipBonusTrack = {
  id: "01a0b4c8-573e-74db-9b5e-594e48dc6323",
  type: "page-type/track",
  slug: "paul-cardall-primary-worship-bonus-track",
  ownLength: 4.423333333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-primary-worship"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "20XKVKt6VVS8BVcxwFYzNk",
      externalLink: "https://open.spotify.com/track/20XKVKt6VVS8BVcxwFYzNk",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Bonus Track",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "bonustrack|7FQRbf8gbKw8KZQZAJWxH2|265400",
  song: "song/paul-cardall-bonus-track",
} as const satisfies Track
