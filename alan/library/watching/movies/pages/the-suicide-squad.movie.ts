import type { Movie } from "../movie.page-type.ts"

export const theSuicideSquad = {
  id: "01a06802-6d9a-701f-ba01-385227d6de03",
  pageTypeSlug: "movie",
  slug: "the-suicide-squad",
  title: "The Suicide Squad",
  partOfSlugs: ["dc-extended-universe"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2021-08-05",
  externalLink: "https://trakt.tv/movies/the-suicide-squad-2021",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
