import type { Season } from "../season.page-type.ts"

export const studioCSeason2 = {
  id: "01a06802-b8be-701f-bc7c-89e2e877f2d1",
  pageTypeSlug: "season",
  slug: "studio-c-season-2",
  title: "Studio C Season 2",
  partOfSlugs: ["studio-c"],
  position: 2,
  ownLength: 300,
  ownProgress: 300,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2013-04-02",
  externalId: "trakt-season-80648",
  externalLink: "https://trakt.tv/shows/studio-c/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
