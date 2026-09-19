import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanSideToSide = {
  id: "01a0a6c5-2baa-7c69-9c7e-91f99443ad96",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-side-to-side",
  ownLength: 3.76955,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4HeCFqiB1rBqGqvE10rF1a",
      externalLink: "https://open.spotify.com/track/4HeCFqiB1rBqGqvE10rF1a",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Side To Side",
  discNumber: 1,
  explicit: true,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "0hCNtLu0JehylgoiP8L4Gh", artistName: "Nicki Minaj" },
  ],
  trackKey: "sidetoside|0hCNtLu0JehylgoiP8L4Gh,66CXWjxzNUsdJxJ2JdwvnR|226173",
  song: "song/ariana-grande-side-to-side",
} as const satisfies Track
