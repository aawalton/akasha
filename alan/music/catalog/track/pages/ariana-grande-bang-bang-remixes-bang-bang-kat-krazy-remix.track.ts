import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeBangBangRemixesBangBangKatKrazyRemix = {
  id: "01a0a6c5-3b91-79b1-841d-3041cd63de49",
  type: "page-type/track",
  slug: "ariana-grande-bang-bang-remixes-bang-bang-kat-krazy-remix",
  ownLength: 3.95755,
  ownProgress: 3.95755,
  partOfCollections: ["release/ariana-grande-bang-bang-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Bang Bang - Kat Krazy Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [
    { artistName: "Jessie J" },
    { artist: "artist/ariana-grande" },
    { artistName: "Nicki Minaj" },
    { artistName: "Kat Krazy" },
  ],
  trackKey:
    "bangbangkatkrazyremix|0hCNtLu0JehylgoiP8L4Gh,2gsggkzM5R49q6jpPvazou,60PKQFvtGXaQWYfVixrrDk,66CXWjxzNUsdJxJ2JdwvnR|237453",
  song: "song/ariana-grande-bang-bang",
  carriedBy: [
    {
      release: "release/ariana-grande-bang-bang-remixes",
      discNumber: 1,
      position: 2,
      externalId: "3wmzSwXcZw3D93kqWeFp9H",
      externalLink: "https://open.spotify.com/track/3wmzSwXcZw3D93kqWeFp9H",
    },
  ],
} as const satisfies Track
