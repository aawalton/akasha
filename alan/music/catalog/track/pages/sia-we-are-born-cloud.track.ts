import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaWeAreBornCloud = {
  id: "01a0a59c-0ae4-7d69-86c8-02005ef0802c",
  type: "track",
  slug: "sia-we-are-born-cloud",
  ownLength: 3.7231,
  ownProgress: 0,
  partOfCollections: ["release/sia-we-are-born"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0Ww6Lu3x7IBz8ojum4JHRu",
      externalLink: "https://open.spotify.com/track/0Ww6Lu3x7IBz8ojum4JHRu",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Cloud",
} as const satisfies Track
