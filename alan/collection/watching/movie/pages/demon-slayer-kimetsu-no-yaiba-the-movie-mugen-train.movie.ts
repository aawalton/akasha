import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const demonSlayerKimetsuNoYaibaTheMovieMugenTrain = {
  id: "01a183d2-f979-7e93-bdbc-b014c6cb7c06",
  type: "page-type/movie",
  slug: "demon-slayer-kimetsu-no-yaiba-the-movie-mugen-train",
  ownLength: 117,
  ownProgress: 0,
  partOfCollections: ["fandom/demon-slayer"],
  publishedAt: "2020-10-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "635302",
      externalLink: "https://www.themoviedb.org/movie/635302",
    },
  ],
  title: "Demon Slayer -Kimetsu no Yaiba- The Movie: Mugen Train",
  createdAt: "2026-10-28T18:43:24.152Z",
  updatedAt: "2026-10-28T18:43:24.152Z",
} as const satisfies Movie
