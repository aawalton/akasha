import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaAndWinterCameOComeOComeEmmanuel = {
  id: "01a0a5b0-0e72-7796-987b-fb60f8c05de0",
  type: "page-type/track",
  slug: "enya-and-winter-came-o-come-o-come-emmanuel",
  ownLength: 3.669766666666667,
  ownProgress: 0,
  partOfCollections: ["release/enya-and-winter-came"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3nGImQxJJs14Nxc676viw6",
      externalLink: "https://open.spotify.com/track/3nGImQxJJs14Nxc676viw6",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "O Come, O Come, Emmanuel",
} as const satisfies Track
