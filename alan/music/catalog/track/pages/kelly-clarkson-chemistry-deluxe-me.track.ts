import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryDeluxeMe = {
  id: "01a0a5ae-b628-7a23-891b-deaf7f6fe328",
  type: "page-type/track",
  slug: "kelly-clarkson-chemistry-deluxe-me",
  ownLength: 3.579083333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-chemistry-deluxe"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7hgTp1muLHN5TtxSAY3Up1",
      externalLink: "https://open.spotify.com/track/7hgTp1muLHN5TtxSAY3Up1",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "me",
} as const satisfies Track
