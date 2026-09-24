import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeBreakFreeBreakFreeACappella = {
  id: "01a0a6c5-3d63-72e5-8599-4ac7327267d6",
  type: "page-type/track",
  slug: "ariana-grande-break-free-break-free-a-cappella",
  ownLength: 3.3838,
  ownProgress: 3.3838,
  partOfCollections: ["release/ariana-grande-break-free"],
  status: "completed",
  unit: "unit/minutes",
  title: "Break Free - A Cappella",
  trackType: "a-cappella",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "breakfreeacappella|66CXWjxzNUsdJxJ2JdwvnR|203028",
  song: "song/ariana-grande-break-free",
  carriedBy: [
    {
      release: "release/ariana-grande-break-free",
      discNumber: 1,
      position: 2,
      externalId: "1VGnGcB9mBywGac3H9yoQj",
      externalLink: "https://open.spotify.com/track/1VGnGcB9mBywGac3H9yoQj",
    },
  ],
} as const satisfies Track
