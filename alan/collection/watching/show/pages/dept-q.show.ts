import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const deptQ = {
  id: "01a06802-9331-7019-b91d-07a999ffa900",
  type: "page-type/show",
  slug: "dept-q",
  title: "Dept. Q",
  partOfCollections: ["show-collection/crime-investigation-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  publishedAt: "2025-05-29",
  externalIdentity: [
    { source: "trakt", externalLink: "https://trakt.tv/shows/dept-q", lastSyncedAt: "2026-01-02" },
  ],
} as const satisfies Show
