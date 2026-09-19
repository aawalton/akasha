import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2AmericanStandardAlmostLikeBeingInLove = {
  id: "01a0abeb-2e8c-7fb3-b25f-cfb793f20bbd",
  type: "page-type/track",
  slug: "james-taylor-2-american-standard-almost-like-being-in-love",
  ownLength: 3.70955,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-american-standard"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1R2eNme8jJ5QKHXQQApdKC",
      externalLink: "https://open.spotify.com/track/1R2eNme8jJ5QKHXQQApdKC",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Almost Like Being In Love",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "almostlikebeinginlove|0vn7UBvSQECKJm2817Yf1P|222573",
  song: "song/james-taylor-almost-like-being-in-love",
} as const satisfies Track
