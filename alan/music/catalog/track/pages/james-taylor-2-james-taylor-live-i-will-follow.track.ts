import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveIWillFollow = {
  id: "01a0abeb-3ef3-73dc-959c-63874ca8cd15",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-i-will-follow",
  ownLength: 3.95555,
  ownProgress: 3.95555,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "I Will Follow",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "iwillfollow|0vn7UBvSQECKJm2817Yf1P|237333",
  song: "song/james-taylor-i-will-follow",
  carriedBy: [
    {
      release: "release/james-taylor-2-james-taylor-live",
      discNumber: 2,
      position: 13,
      externalId: "5XG30JWRg0y9QXGEXHXAEk",
      externalLink: "https://open.spotify.com/track/5XG30JWRg0y9QXGEXHXAEk",
    },
  ],
} as const satisfies Track
