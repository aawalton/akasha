import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveIWillFollow = {
  id: "01a0abeb-3ef3-73dc-959c-63874ca8cd15",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-i-will-follow",
  ownLength: 3.95555,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5XG30JWRg0y9QXGEXHXAEk",
      externalLink: "https://open.spotify.com/track/5XG30JWRg0y9QXGEXHXAEk",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "I Will Follow",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "iwillfollow|0vn7UBvSQECKJm2817Yf1P|237333",
} as const satisfies Track
