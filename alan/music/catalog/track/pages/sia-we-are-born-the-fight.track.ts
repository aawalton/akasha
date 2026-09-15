import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaWeAreBornTheFight = {
  id: "01a0a59c-09ed-774f-a1dc-d21faa856017",
  type: "page-type/track",
  slug: "sia-we-are-born-the-fight",
  ownLength: 3.638,
  ownProgress: 0,
  partOfCollections: ["release/sia-we-are-born"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Ok3uOPbafn05DRISYECGv",
      externalLink: "https://open.spotify.com/track/5Ok3uOPbafn05DRISYECGv",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "The Fight",
} as const satisfies Track
