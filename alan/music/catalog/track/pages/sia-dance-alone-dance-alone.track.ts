import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaDanceAloneDanceAlone = {
  id: "01a0a59c-2349-726c-8d21-2a99f6d58681",
  type: "page-type/track",
  slug: "sia-dance-alone-dance-alone",
  ownLength: 2.8707666666666665,
  ownProgress: 0,
  partOfCollections: ["release/sia-dance-alone"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1XZy2eprbATl4AnL9Fpsw1",
      externalLink: "https://open.spotify.com/track/1XZy2eprbATl4AnL9Fpsw1",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Dance Alone",
} as const satisfies Track
