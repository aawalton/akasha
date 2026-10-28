import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const ouranHighSchoolHostClub = {
  id: "01a183d5-3fb0-7479-8126-c9aa4e1db1e8",
  type: "page-type/show",
  slug: "ouran-high-school-host-club",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/ouran-high-school-host-club"],
  publishedAt: "2006-04-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "1043", externalLink: "https://www.themoviedb.org/tv/1043" },
  ],
  title: "Ouran High School Host Club",
  createdAt: "2026-10-28T18:45:53.198Z",
  updatedAt: "2026-10-28T18:45:53.198Z",
} as const satisfies Show
