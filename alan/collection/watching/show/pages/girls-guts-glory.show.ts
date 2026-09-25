import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const girlsGutsGlory = {
  id: "01a06802-9331-702b-868b-a41e45f94b3e",
  type: "page-type/show",
  slug: "girls-guts-glory",
  title: "Girls Guts Glory",
  partOfCollections: ["show-collection/dungeons-and-dragons-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2017-05-04",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/girls-guts-glory",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
