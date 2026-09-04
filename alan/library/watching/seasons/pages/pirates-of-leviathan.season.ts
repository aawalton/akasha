import type { Season } from "../season.page-type.ts"

export const piratesOfLeviathan = {
  id: "01a06802-b8bc-7019-8624-71139c8e348c",
  pageTypeSlug: "season",
  slug: "pirates-of-leviathan",
  title: "Pirates of Leviathan",
  partOfSlugs: ["dimension-20"],
  position: 6,
  ownLength: 784.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2020-09-16",
  externalId: "trakt-season-228898",
  externalLink: "https://trakt.tv/shows/dimension-20/seasons/6",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
