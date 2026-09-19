import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSantaCanTYouHearMeSantaCantYouHearMe = {
  id: "01a0a6c5-36f3-7941-b2aa-14db0dbab138",
  type: "page-type/track",
  slug: "ariana-grande-santa-can-t-you-hear-me-santa-cant-you-hear-me",
  ownLength: 4.044066666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-santa-can-t-you-hear-me"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7B9SFykXtlvM2YCjKwyULL",
      externalLink: "https://open.spotify.com/track/7B9SFykXtlvM2YCjKwyULL",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Santa, Can’t You Hear Me",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "3BmGtnKgCSGYIUhmivXKWX", artistName: "Kelly Clarkson" },
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
  ],
  trackKey: "santacantyouhearme|3BmGtnKgCSGYIUhmivXKWX,66CXWjxzNUsdJxJ2JdwvnR|242644",
  song: "song/kelly-clarkson-santa-cant-you-hear-me",
} as const satisfies Track
