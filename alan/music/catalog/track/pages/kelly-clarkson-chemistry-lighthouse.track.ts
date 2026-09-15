import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryLighthouse = {
  id: "01a0a5ae-b97e-7f0c-9121-8f686e18bfde",
  type: "page-type/track",
  slug: "kelly-clarkson-chemistry-lighthouse",
  ownLength: 3.3508833333333334,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-chemistry"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5lQfYRKNlAYxnJIvvaEJLO",
      externalLink: "https://open.spotify.com/track/5lQfYRKNlAYxnJIvvaEJLO",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "lighthouse",
} as const satisfies Track
