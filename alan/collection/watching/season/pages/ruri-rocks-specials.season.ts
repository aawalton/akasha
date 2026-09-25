import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ruriRocksSpecials = {
  id: "01a06802-b8bc-701f-962d-be393a321abf",
  type: "page-type/season",
  slug: "ruri-rocks-specials",
  title: "Ruri Rocks Specials",
  partOfCollections: ["show/ruri-rocks"],
  position: 0,
  ownLength: 36,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2025-07-10",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "0",
      externalLink: "https://trakt.tv/shows/ruri-rocks/seasons/0",
      lastSyncedAt: "2025-11-30",
    },
  ],
} as const satisfies Season
