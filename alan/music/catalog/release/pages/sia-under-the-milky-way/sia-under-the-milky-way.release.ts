import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaUnderTheMilkyWay = {
  id: "01a0676a-d72f-7034-a8df-11b5f2576969",
  type: "page-type/release",
  slug: "sia-under-the-milky-way",
  title: "Under the Milky Way",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2010-01-26",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1qmlkgO15eRvbMI6ohZSy8",
      externalLink: "https://open.spotify.com/album/1qmlkgO15eRvbMI6ohZSy8",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.287Z",
  updatedAt: "2026-10-20T14:01:30.339Z",
  progressedAt: "2026-10-20T14:01:30.339Z",
} as const satisfies Release
