import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const moonlightAndMistletoe = {
  id: "01a17499-470d-7bfa-924d-8657f7b5661c",
  type: "page-type/movie",
  slug: "moonlight-and-mistletoe",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2008-11-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "51443",
      externalLink: "https://www.themoviedb.org/movie/51443",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Moonlight_and_Mistletoe" },
  ],
  title: "Moonlight and Mistletoe",
  genres: ["TV Movie", "Drama", "Comedy", "Romance", "Family"],
  imdbId: "tt1264895",
  posterPath: "/jgYquX1UtZmsGULe5v5PtC104nL.jpg",
  voteAverage: 5.8,
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
