import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsDeluxeNasty = {
  id: "01a0a6c5-1fc7-7c3d-b843-e9370b81a34b",
  type: "page-type/track",
  slug: "ariana-grande-positions-deluxe-nasty",
  ownLength: 3.3455333333333335,
  ownProgress: 3.3455333333333335,
  partOfCollections: ["release/ariana-grande-positions-deluxe", "release/ariana-grande-positions"],
  status: "completed",
  unit: "unit/minutes",
  title: "nasty",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "nasty|66CXWjxzNUsdJxJ2JdwvnR|200732",
  song: "song/ariana-grande-nasty",
  carriedBy: [
    {
      release: "release/ariana-grande-positions",
      discNumber: 1,
      position: 9,
      externalId: "0sci7ppTZFm4mjcH3nu8yO",
      externalLink: "https://open.spotify.com/track/0sci7ppTZFm4mjcH3nu8yO",
    },
    {
      release: "release/ariana-grande-positions-deluxe",
      discNumber: 1,
      position: 9,
      externalId: "7wcl0YJBQ0ygTUUaXLRM1g",
      externalLink: "https://open.spotify.com/track/7wcl0YJBQ0ygTUUaXLRM1g",
    },
  ],
} as const satisfies Track
