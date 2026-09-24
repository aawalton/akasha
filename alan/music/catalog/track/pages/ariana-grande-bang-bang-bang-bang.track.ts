import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeBangBangBangBang = {
  id: "01a0a6c5-3ce8-79ab-8e10-1ef7c946f2da",
  type: "page-type/track",
  slug: "ariana-grande-bang-bang-bang-bang",
  ownLength: 3.32295,
  ownProgress: 3.32295,
  partOfCollections: [
    "release/ariana-grande-bang-bang",
    "release/ariana-grande-my-everything-tenth-anniversary-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Bang Bang",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { artistName: "Jessie J" },
    { artist: "artist/ariana-grande" },
    { artistName: "Nicki Minaj" },
  ],
  trackKey: "bangbang|0hCNtLu0JehylgoiP8L4Gh,2gsggkzM5R49q6jpPvazou,66CXWjxzNUsdJxJ2JdwvnR|199377",
  song: "song/ariana-grande-bang-bang",
  carriedBy: [
    {
      release: "release/ariana-grande-bang-bang",
      discNumber: 1,
      position: 1,
      externalId: "7I1IALTGkjzWa3fAmB3NAh",
      externalLink: "https://open.spotify.com/track/7I1IALTGkjzWa3fAmB3NAh",
    },
    {
      release: "release/ariana-grande-my-everything-tenth-anniversary-edition",
      discNumber: 1,
      position: 13,
      externalId: "742RnSnVo7SZNhN32AavQJ",
      externalLink: "https://open.spotify.com/track/742RnSnVo7SZNhN32AavQJ",
    },
  ],
} as const satisfies Track
