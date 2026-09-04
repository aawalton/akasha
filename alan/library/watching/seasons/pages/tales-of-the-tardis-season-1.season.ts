import type { Season } from "../season.page-type.ts"

export const talesOfTheTardisSeason1 = {
  id: "01a06802-b8be-7033-a6f6-f247066d7cf5",
  pageTypeSlug: "season",
  slug: "tales-of-the-tardis-season-1",
  title: "Tales of the Tardis Season 1",
  partOfSlugs: ["tales-of-the-tardis"],
  position: 1,
  ownLength: 673.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2023-11-01",
  externalId: "trakt-season-339622",
  externalLink: "https://trakt.tv/shows/tales-of-the-tardis/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
