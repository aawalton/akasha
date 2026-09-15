import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexWarrenEternity2Eternity = {
  id: "01a0a59d-cfb6-7553-a60d-c284cc5661da",
  type: "track",
  slug: "alex-warren-eternity-2-eternity",
  ownLength: 3.1592166666666666,
  ownProgress: 0,
  partOfCollections: ["release/alex-warren-eternity-2"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5oDWXeoEFBO4TTF1lZkF2b",
      externalLink: "https://open.spotify.com/track/5oDWXeoEFBO4TTF1lZkF2b",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Eternity",
} as const satisfies Track
