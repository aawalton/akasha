import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const florenceTheMachineDanceFeverKing = {
  id: "01a0a5cd-5a3d-7e48-ab9a-5b7c29257e18",
  type: "track",
  slug: "florence-the-machine-dance-fever-king",
  ownLength: 4.668833333333334,
  ownProgress: 0,
  partOfCollections: ["release/florence-the-machine-dance-fever"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "31ABtQJdfloNaGz7ZhXaN5",
      externalLink: "https://open.spotify.com/track/31ABtQJdfloNaGz7ZhXaN5",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "King",
} as const satisfies Track
