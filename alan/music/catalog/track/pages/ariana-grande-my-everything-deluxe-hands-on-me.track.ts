import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingDeluxeHandsOnMe = {
  id: "01a0a6c5-2ec6-7482-9a6e-971f454672cd",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-deluxe-hands-on-me",
  ownLength: 3.2037666666666667,
  ownProgress: 3.2037666666666667,
  partOfCollections: ["release/ariana-grande-my-everything-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hands On Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }, { artistName: "A$AP Ferg" }],
  trackKey: "handsonme|5dHt1vcEm9qb8fCyLcB3HL,66CXWjxzNUsdJxJ2JdwvnR|192226",
  song: "song/ariana-grande-hands-on-me",
  carriedBy: [
    {
      release: "release/ariana-grande-my-everything-deluxe",
      discNumber: 1,
      position: 11,
      externalId: "1rNop31kdDmSj3Ds6xhIeS",
      externalLink: "https://open.spotify.com/track/1rNop31kdDmSj3Ds6xhIeS",
    },
  ],
} as const satisfies Track
