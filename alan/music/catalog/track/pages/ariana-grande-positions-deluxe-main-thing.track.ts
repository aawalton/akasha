import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsDeluxeMainThing = {
  id: "01a0a6c5-210b-7811-a17c-42da84a1d0c5",
  type: "page-type/track",
  slug: "ariana-grande-positions-deluxe-main-thing",
  ownLength: 2.1513333333333335,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-positions-deluxe"],
  position: 19,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "63WsFFnQ8CL941iZBELYsX",
      externalLink: "https://open.spotify.com/track/63WsFFnQ8CL941iZBELYsX",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "main thing",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "mainthing|66CXWjxzNUsdJxJ2JdwvnR|129080",
  song: "song/ariana-grande-main-thing",
} as const satisfies Track
