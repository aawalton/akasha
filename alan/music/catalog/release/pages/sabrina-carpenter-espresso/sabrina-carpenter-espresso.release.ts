import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterEspresso = {
  id: "01a0676a-d71d-7021-a4cf-7790d9a8da90",
  type: "page-type/release",
  slug: "sabrina-carpenter-espresso",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2024-04-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5quMTd5zeI9yW5UDua8wS4",
      externalLink: "https://open.spotify.com/album/5quMTd5zeI9yW5UDua8wS4",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "Espresso",
  createdAt: "2026-09-03T13:17:30.269Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
