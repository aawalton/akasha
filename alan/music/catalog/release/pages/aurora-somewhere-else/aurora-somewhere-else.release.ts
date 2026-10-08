import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraSomewhereElse = {
  id: "01a0b637-eb1f-77fb-a768-539cfdc9ca4b",
  type: "page-type/release",
  slug: "aurora-somewhere-else",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2026-03-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4EnO1awhtStAEtRvKfKaUl",
      externalLink: "https://open.spotify.com/album/4EnO1awhtStAEtRvKfKaUl",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "SOMEWHERE ELSE",
  createdAt: "2026-09-18T20:31:53.119Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
