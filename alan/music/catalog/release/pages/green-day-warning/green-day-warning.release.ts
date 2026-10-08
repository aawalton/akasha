import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const greenDayWarning = {
  id: "01a0676a-d730-7019-9af3-6791e9039a6a",
  type: "page-type/release",
  slug: "green-day-warning",
  title: "Warning",
  partOfCollections: ["artist/green-day"],
  position: 0,
  ownLength: 41.153267,
  ownProgress: 41.153267,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "2000-10-03",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ifIxGNsG1XmLdoanRRIWB",
      externalLink: "https://open.spotify.com/album/3ifIxGNsG1XmLdoanRRIWB",
      lastSyncedAt: "2025-10-04",
    },
  ],
  createdAt: "2026-09-03T13:17:30.288Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
