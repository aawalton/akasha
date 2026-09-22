import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePetalLikeIDo = {
  id: "01a0a6c5-04f2-7591-9ab4-fbed7c27827d",
  type: "page-type/track",
  slug: "ariana-grande-petal-like-i-do",
  ownLength: 2.788883333333333,
  ownProgress: 2.788883333333333,
  partOfCollections: ["release/ariana-grande-petal"],
  status: "completed",
  unit: "unit/minutes",
  title: "like i do",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "likeido|66CXWjxzNUsdJxJ2JdwvnR|167333",
  song: "song/ariana-grande-like-i-do",
  carriedBy: [
    {
      release: "release/ariana-grande-petal",
      discNumber: 1,
      position: 9,
      externalId: "3d1oTMjtfVySbAYQp3v4MU",
      externalLink: "https://open.spotify.com/track/3d1oTMjtfVySbAYQp3v4MU",
    },
  ],
} as const satisfies Track
