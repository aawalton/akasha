import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPrimaryWorshipBonusTrack = {
  id: "01a0b4c8-573e-74db-9b5e-594e48dc6323",
  type: "page-type/track",
  slug: "paul-cardall-primary-worship-bonus-track",
  ownLength: 4.423333333333333,
  ownProgress: 4.423333333333333,
  partOfCollections: ["release/paul-cardall-primary-worship"],
  status: "completed",
  unit: "unit/minutes",
  title: "Bonus Track",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "bonustrack|7FQRbf8gbKw8KZQZAJWxH2|265400",
  song: "song/paul-cardall-bonus-track",
  carriedBy: [
    {
      release: "release/paul-cardall-primary-worship",
      discNumber: 1,
      position: 13,
      externalId: "20XKVKt6VVS8BVcxwFYzNk",
      externalLink: "https://open.spotify.com/track/20XKVKt6VVS8BVcxwFYzNk",
    },
  ],
} as const satisfies Track
