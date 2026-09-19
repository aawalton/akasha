import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSantaCanTYouHearMeLiveSantaCantYouHearMeLive = {
  id: "01a0a6c5-365e-709d-81c1-d090c053f9a3",
  type: "page-type/track",
  slug: "ariana-grande-santa-can-t-you-hear-me-live-santa-cant-you-hear-me-live",
  ownLength: 3.7596333333333334,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-santa-can-t-you-hear-me-live"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5ahXNwWh68Oohss2j2jDnl",
      externalLink: "https://open.spotify.com/track/5ahXNwWh68Oohss2j2jDnl",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Santa, Can’t You Hear Me - Live",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "3BmGtnKgCSGYIUhmivXKWX", artistName: "Kelly Clarkson" },
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
  ],
  trackKey: "santacantyouhearmelive|3BmGtnKgCSGYIUhmivXKWX,66CXWjxzNUsdJxJ2JdwvnR|225578",
  song: "song/ariana-grande-santa-can-t-you-hear-me",
} as const satisfies Track
