import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeBreakFreeBreakFree = {
  id: "01a0a6c5-3d44-726e-b1a8-6e8b195cc6e7",
  type: "page-type/track",
  slug: "ariana-grande-break-free-break-free",
  ownLength: 3.5807166666666665,
  ownProgress: 3.5807166666666665,
  partOfCollections: [
    "release/ariana-grande-break-free",
    "release/ariana-grande-my-everything-tenth-anniversary-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Break Free",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }, { artistName: "Zedd" }],
  trackKey: "breakfree|2qxJFvFYMEDqd7ui6kSAcq,66CXWjxzNUsdJxJ2JdwvnR|214843",
  song: "song/ariana-grande-break-free",
  carriedBy: [
    {
      release: "release/ariana-grande-break-free",
      discNumber: 1,
      position: 1,
      externalId: "2lOgTEwxmRPBtjp60opyRN",
      externalLink: "https://open.spotify.com/track/2lOgTEwxmRPBtjp60opyRN",
    },
    {
      release: "release/ariana-grande-my-everything-tenth-anniversary-edition",
      discNumber: 1,
      position: 5,
      externalId: "7qQKhhQkLGxDKeF0EY2uH6",
      externalLink: "https://open.spotify.com/track/7qQKhhQkLGxDKeF0EY2uH6",
    },
  ],
} as const satisfies Track
