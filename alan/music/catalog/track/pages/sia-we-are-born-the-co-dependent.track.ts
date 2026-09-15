import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaWeAreBornTheCoDependent = {
  id: "01a0a59c-0b18-7aaa-80be-fc78ba94cb11",
  type: "track",
  slug: "sia-we-are-born-the-co-dependent",
  ownLength: 2.92355,
  ownProgress: 0,
  partOfCollections: ["release/sia-we-are-born"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ybg7mL6yO0v90BdwkAJvj",
      externalLink: "https://open.spotify.com/track/3ybg7mL6yO0v90BdwkAJvj",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "The Co-Dependent",
} as const satisfies Track
