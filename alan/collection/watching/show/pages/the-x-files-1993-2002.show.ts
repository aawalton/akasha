import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const theXFiles19932002 = {
  id: "01a06802-9333-7009-b8bd-40e766154cf3",
  type: "page-type/show",
  slug: "the-x-files-1993-2002",
  title: "The X-Files (1993-2002)",
  partOfCollections: ["show-collection/x-files"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "1993-09-11",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "the-x-files",
      externalLink: "https://trakt.tv/shows/the-x-files",
      lastSyncedAt: "2025-10-22",
    },
  ],
} as const satisfies Show
