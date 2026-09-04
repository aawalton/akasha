import type { Season } from "../season.page-type.ts"

export const studioCSeason5 = {
  id: "01a06802-b8be-7024-8073-73b2105e1507",
  pageTypeSlug: "season",
  slug: "studio-c-season-5",
  title: "Studio C Season 5",
  partOfSlugs: ["studio-c"],
  position: 5,
  ownLength: 277.8,
  ownProgress: 277.8,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2014-10-07",
  externalId: "trakt-season-81016",
  externalLink: "https://trakt.tv/shows/studio-c/seasons/5",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
