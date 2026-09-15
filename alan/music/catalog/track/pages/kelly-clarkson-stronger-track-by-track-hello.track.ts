import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonStrongerTrackByTrackHello = {
  id: "01a0a5ae-c665-77a6-bf28-4ae2e8e7669e",
  type: "page-type/track",
  slug: "kelly-clarkson-stronger-track-by-track-hello",
  ownLength: 2.9788833333333335,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-stronger-track-by-track"],
  position: 18,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5HJCyM5eW7eoQKalEXFUb9",
      externalLink: "https://open.spotify.com/track/5HJCyM5eW7eoQKalEXFUb9",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Hello",
} as const satisfies Track
