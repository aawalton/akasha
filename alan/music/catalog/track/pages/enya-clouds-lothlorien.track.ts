import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaCloudsLothlorien = {
  id: "01a0a5b0-2a70-7b41-9c61-1f68b52ab494",
  type: "page-type/track",
  slug: "enya-clouds-lothlorien",
  ownLength: 2.1348833333333332,
  ownProgress: 0,
  partOfCollections: ["release/enya-clouds"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7F3GlQ4H2c71AfG1g5N972",
      externalLink: "https://open.spotify.com/track/7F3GlQ4H2c71AfG1g5N972",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Lothlórien",
} as const satisfies Track
