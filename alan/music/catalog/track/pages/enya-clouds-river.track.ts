import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaCloudsRiver = {
  id: "01a0a5b0-2aee-783e-8a9c-d41bd822bd4e",
  type: "track",
  slug: "enya-clouds-river",
  ownLength: 3.18955,
  ownProgress: 0,
  partOfCollections: ["release/enya-clouds"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4E7ybsSRugfJNf66TWrhz0",
      externalLink: "https://open.spotify.com/track/4E7ybsSRugfJNf66TWrhz0",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "River",
} as const satisfies Track
