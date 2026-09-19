import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSantaCanTYouHearMeLiveSantaCantYouHearMe = {
  id: "01a0a6c5-3683-71c2-a0fd-f1d71ffd4da1",
  type: "page-type/track",
  slug: "ariana-grande-santa-can-t-you-hear-me-live-santa-cant-you-hear-me",
  ownLength: 4.044066666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-santa-can-t-you-hear-me-live"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5XDcWDGnFLs3P3F0XfIpgN",
      externalLink: "https://open.spotify.com/track/5XDcWDGnFLs3P3F0XfIpgN",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Santa, Can’t You Hear Me",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "3BmGtnKgCSGYIUhmivXKWX", artistName: "Kelly Clarkson" },
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
  ],
  trackKey: "santacantyouhearme|3BmGtnKgCSGYIUhmivXKWX,66CXWjxzNUsdJxJ2JdwvnR|242644",
  song: "song/kelly-clarkson-santa-cant-you-hear-me",
} as const satisfies Track
