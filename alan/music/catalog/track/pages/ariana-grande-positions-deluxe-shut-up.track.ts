import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsDeluxeShutUp = {
  id: "01a0a6c5-1edd-73b6-ad19-a36da976dc48",
  type: "page-type/track",
  slug: "ariana-grande-positions-deluxe-shut-up",
  ownLength: 2.6285,
  ownProgress: 2.6285,
  partOfCollections: ["release/ariana-grande-positions-deluxe", "release/ariana-grande-positions"],
  status: "completed",
  unit: "unit/minutes",
  title: "shut up",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "shutup|66CXWjxzNUsdJxJ2JdwvnR|157710",
  song: "song/ariana-grande-shut-up",
  carriedBy: [
    {
      release: "release/ariana-grande-positions",
      discNumber: 1,
      position: 1,
      externalId: "3ko9jEHNt4O5fjKN65ULJp",
      externalLink: "https://open.spotify.com/track/3ko9jEHNt4O5fjKN65ULJp",
    },
    {
      release: "release/ariana-grande-positions-deluxe",
      discNumber: 1,
      position: 1,
      externalId: "12sliObzVzbLbAlDb8eChf",
      externalLink: "https://open.spotify.com/track/12sliObzVzbLbAlDb8eChf",
    },
  ],
} as const satisfies Track
