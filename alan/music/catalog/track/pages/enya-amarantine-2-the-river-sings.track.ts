import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaAmarantine2TheRiverSings = {
  id: "01a0a5b0-1034-7855-97d0-e7b2aece06cc",
  type: "track",
  slug: "enya-amarantine-2-the-river-sings",
  ownLength: 2.8359833333333335,
  ownProgress: 0,
  partOfCollections: ["release/enya-amarantine-2"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3RiBRjMbyN8iWXgfvTtJZy",
      externalLink: "https://open.spotify.com/track/3RiBRjMbyN8iWXgfvTtJZy",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "The River Sings",
} as const satisfies Track
