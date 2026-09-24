import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingDeluxeBreakFree = {
  id: "01a0a6c5-2de2-75fd-87cd-13cdcc0776d8",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-deluxe-break-free",
  ownLength: 3.5806666666666667,
  ownProgress: 3.5806666666666667,
  partOfCollections: ["release/ariana-grande-my-everything-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Break Free",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }, { artistName: "Zedd" }],
  trackKey: "breakfree|2qxJFvFYMEDqd7ui6kSAcq,66CXWjxzNUsdJxJ2JdwvnR|214840",
  song: "song/ariana-grande-break-free",
  carriedBy: [
    {
      release: "release/ariana-grande-my-everything-deluxe",
      discNumber: 1,
      position: 5,
      externalId: "12KUFSHFgT0XCoiSlvdQi4",
      externalLink: "https://open.spotify.com/track/12KUFSHFgT0XCoiSlvdQi4",
    },
  ],
} as const satisfies Track
