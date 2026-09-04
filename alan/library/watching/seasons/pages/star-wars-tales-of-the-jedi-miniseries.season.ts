import type { Season } from "../season.page-type.ts"

export const starWarsTalesOfTheJediMiniseries = {
  id: "01a06802-b8bd-7038-a7dd-85b5d90fd128",
  pageTypeSlug: "season",
  slug: "star-wars-tales-of-the-jedi-miniseries",
  title: "Star Wars: Tales of the Jedi Miniseries",
  partOfSlugs: ["star-wars-tales-of-the-jedi"],
  position: 1,
  ownLength: 99,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2022-10-26",
  externalId: "trakt-season-295674",
  externalLink: "https://trakt.tv/shows/star-wars-tales-of-the-jedi/seasons/1",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
