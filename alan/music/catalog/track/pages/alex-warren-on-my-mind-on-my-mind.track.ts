import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexWarrenOnMyMindOnMyMind = {
  id: "01a0a59d-cfdb-7b3e-8e4a-b4b4d6ca4c02",
  type: "page-type/track",
  slug: "alex-warren-on-my-mind-on-my-mind",
  ownLength: 3.159283333333333,
  ownProgress: 0,
  partOfCollections: ["release/alex-warren-on-my-mind"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1tMRh8jiYlmatpVeWWesCe",
      externalLink: "https://open.spotify.com/track/1tMRh8jiYlmatpVeWWesCe",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "On My Mind",
} as const satisfies Track
