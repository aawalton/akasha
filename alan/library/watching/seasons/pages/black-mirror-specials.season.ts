import type { Season } from "../season.page-type.ts"

export const blackMirrorSpecials = {
  id: "01a06802-b8b8-700a-906e-824c6684127e",
  pageTypeSlug: "season",
  slug: "black-mirror-specials",
  title: "Black Mirror Specials",
  partOfSlugs: ["black-mirror"],
  position: 0,
  ownLength: 73.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2014-12-16",
  externalId: "trakt-season-103681",
  externalLink: "https://trakt.tv/shows/black-mirror/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
