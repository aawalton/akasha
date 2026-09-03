import type { Season } from "../season.page-type.ts"

export const theXFilesSpecials = {
  id: "01a06802-b8c0-7004-831a-f1696db4b03f",
  pageTypeSlug: "season",
  slug: "the-x-files-specials",
  title: "The X-Files Specials",
  partOfSlugs: ["the-x-files-1993-2002"],
  position: 0,
  ownLength: 1205,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "1998-06-20",
  externalId: "0",
  externalLink: "https://trakt.tv/shows/the-x-files/seasons/0",
  lastSyncedAt: "2025-10-22",
} as const satisfies Season
