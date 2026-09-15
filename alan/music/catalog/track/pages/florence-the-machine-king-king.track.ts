import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const florenceTheMachineKingKing = {
  id: "01a0a5cd-7b77-7fa9-9fee-e96e6b8d53fa",
  type: "page-type/track",
  slug: "florence-the-machine-king-king",
  ownLength: 4.668833333333334,
  ownProgress: 0,
  partOfCollections: ["release/florence-the-machine-king"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1VSngtLdJhrlfHkLxTyOXK",
      externalLink: "https://open.spotify.com/track/1VSngtLdJhrlfHkLxTyOXK",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "King",
} as const satisfies Track
