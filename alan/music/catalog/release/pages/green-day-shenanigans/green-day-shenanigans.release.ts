import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const greenDayShenanigans = {
  id: "01a0676a-d728-7071-9b32-a24faf1250be",
  type: "page-type/release",
  slug: "green-day-shenanigans",
  title: "Shenanigans",
  partOfCollections: ["artist/green-day"],
  position: 0,
  ownLength: 33.393717,
  ownProgress: 33.393717,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "2002-07-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3uxqKqchyNKPHdjzMrlmOC",
      externalLink: "https://open.spotify.com/album/3uxqKqchyNKPHdjzMrlmOC",
      lastSyncedAt: "2025-10-04",
    },
  ],
  createdAt: "2026-09-03T13:17:30.280Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
