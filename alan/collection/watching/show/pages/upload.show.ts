import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const upload = {
  id: "01a06802-9333-700b-9e2d-443f54b562cb",
  type: "page-type/show",
  slug: "upload",
  title: "Upload",
  partOfCollections: ["show-collection/science-fiction-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2020-04-30",
  externalIdentity: [
    { source: "trakt", externalLink: "https://trakt.tv/shows/upload", lastSyncedAt: "2025-10-01" },
  ],
} as const satisfies Show
