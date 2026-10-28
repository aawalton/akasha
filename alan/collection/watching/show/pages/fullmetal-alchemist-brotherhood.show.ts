import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const fullmetalAlchemistBrotherhood = {
  id: "01a183d2-9b8e-7b53-8f8f-5be2bb0efaba",
  type: "page-type/show",
  slug: "fullmetal-alchemist-brotherhood",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/fullmetal-alchemist"],
  publishedAt: "2009-04-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "31911", externalLink: "https://www.themoviedb.org/tv/31911" },
  ],
  title: "Fullmetal Alchemist: Brotherhood",
  createdAt: "2026-10-28T18:43:00.104Z",
  updatedAt: "2026-10-28T18:43:00.104Z",
} as const satisfies Show
