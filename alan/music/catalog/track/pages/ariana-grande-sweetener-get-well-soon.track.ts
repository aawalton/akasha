import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSweetenerGetWellSoon = {
  id: "01a0a6c5-2ae4-7460-a202-1a2db6d5c364",
  type: "page-type/track",
  slug: "ariana-grande-sweetener-get-well-soon",
  ownLength: 5.3671,
  ownProgress: 5.3671,
  partOfCollections: ["release/ariana-grande-sweetener"],
  status: "completed",
  unit: "unit/minutes",
  title: "get well soon",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "getwellsoon|66CXWjxzNUsdJxJ2JdwvnR|322026",
  song: "song/ariana-grande-get-well-soon",
  carriedBy: [
    {
      release: "release/ariana-grande-sweetener",
      discNumber: 1,
      position: 15,
      externalId: "7u6DMPznGbpziuEgCE0JGQ",
      externalLink: "https://open.spotify.com/track/7u6DMPznGbpziuEgCE0JGQ",
    },
  ],
} as const satisfies Track
