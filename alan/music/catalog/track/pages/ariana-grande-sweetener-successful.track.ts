import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSweetenerSuccessful = {
  id: "01a0a6c5-29d5-7be9-ae30-b853631e20d9",
  type: "page-type/track",
  slug: "ariana-grande-sweetener-successful",
  ownLength: 3.7897666666666665,
  ownProgress: 3.7897666666666665,
  partOfCollections: ["release/ariana-grande-sweetener"],
  status: "completed",
  unit: "unit/minutes",
  title: "successful",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "successful|66CXWjxzNUsdJxJ2JdwvnR|227386",
  song: "song/ariana-grande-successful",
  carriedBy: [
    {
      release: "release/ariana-grande-sweetener",
      discNumber: 1,
      position: 7,
      externalId: "5YeHLHDdQ4nKHk81XFWhCU",
      externalLink: "https://open.spotify.com/track/5YeHLHDdQ4nKHk81XFWhCU",
    },
  ],
} as const satisfies Track
