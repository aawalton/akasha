import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const freeTheFinalStrokeTheSecondVolume = {
  id: "01a183d7-dc21-701e-955d-b30bcf1f32f5",
  type: "page-type/movie",
  slug: "free-the-final-stroke-the-second-volume",
  ownLength: 107,
  ownProgress: 0,
  partOfCollections: ["fandom/free"],
  publishedAt: "2022-04-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "823417",
      externalLink: "https://www.themoviedb.org/movie/823417",
    },
  ],
  title: "Free! the Final Stroke the Second Volume",
  createdAt: "2026-10-28T18:48:44.321Z",
  updatedAt: "2026-10-28T18:48:44.321Z",
} as const satisfies Movie
