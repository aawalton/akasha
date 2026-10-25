import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const laFemmeMusketeer = {
  id: "01a17497-3827-75fa-8e68-62fc106463d2",
  type: "page-type/movie",
  slug: "la-femme-musketeer",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2004-06-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/La_Femme_Musketeer" },
  ],
  title: "La Femme Musketeer",
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
