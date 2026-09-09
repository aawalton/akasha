import type { Season } from "../season.page-type.ts"

export const elementarySpecials = {
  id: "01a06802-b8b9-703a-97ab-86670d253612",
  pageTypeSlug: "season",
  slug: "elementary-specials",
  title: "Elementary Specials",
  partOfCollections: ["elementary"],
  position: 0,
  ownLength: 214.8,
  ownProgress: 214.8,
  unit: "minutes",
  status: "archived",
  publishedAt: "2015-09-14",
  externalId: "trakt-season-4057",
  externalLink: "https://trakt.tv/shows/elementary/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
