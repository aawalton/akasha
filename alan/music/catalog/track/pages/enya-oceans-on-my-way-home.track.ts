import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaOceansOnMyWayHome = {
  id: "01a0a5b0-2d80-75e2-a0cd-17ab89af8a75",
  type: "page-type/track",
  slug: "enya-oceans-on-my-way-home",
  ownLength: 3.6066666666666665,
  ownProgress: 0,
  partOfCollections: ["release/enya-oceans"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0WSGqJa2BVCYxjpS67Lt4N",
      externalLink: "https://open.spotify.com/track/0WSGqJa2BVCYxjpS67Lt4N",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "On My Way Home",
} as const satisfies Track
