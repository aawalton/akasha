import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryDeluxeMagic = {
  id: "01a0a5ae-b695-7173-8a96-e3d824357705",
  type: "track",
  slug: "kelly-clarkson-chemistry-deluxe-magic",
  ownLength: 3.25155,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-chemistry-deluxe"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "61J6b4o0R4aWYcRp7ttDVd",
      externalLink: "https://open.spotify.com/track/61J6b4o0R4aWYcRp7ttDVd",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "magic",
} as const satisfies Track
