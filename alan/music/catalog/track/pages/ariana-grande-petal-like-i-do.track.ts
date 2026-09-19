import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePetalLikeIDo = {
  id: "01a0a6c5-04f2-7591-9ab4-fbed7c27827d",
  type: "page-type/track",
  slug: "ariana-grande-petal-like-i-do",
  ownLength: 2.788883333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-petal"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3d1oTMjtfVySbAYQp3v4MU",
      externalLink: "https://open.spotify.com/track/3d1oTMjtfVySbAYQp3v4MU",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "like i do",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "likeido|66CXWjxzNUsdJxJ2JdwvnR|167333",
  song: "song/ariana-grande-like-i-do",
} as const satisfies Track
