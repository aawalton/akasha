import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaTheCelts2Fairytale = {
  id: "01a0a5b0-210b-7e60-b14e-c1e962b72e8c",
  type: "page-type/track",
  slug: "enya-the-celts-2-fairytale",
  ownLength: 3.0771,
  ownProgress: 0,
  partOfCollections: ["release/enya-the-celts-2"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3oy7aXWP1l5HctKbKqFzyD",
      externalLink: "https://open.spotify.com/track/3oy7aXWP1l5HctKbKqFzyD",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Fairytale",
} as const satisfies Track
