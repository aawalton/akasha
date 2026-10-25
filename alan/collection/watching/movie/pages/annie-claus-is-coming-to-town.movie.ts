import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const annieClausIsComingToTown = {
  id: "01a17499-669d-76ee-900e-7a1799e1272e",
  type: "page-type/movie",
  slug: "annie-claus-is-coming-to-town",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2011-12-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "81416",
      externalLink: "https://www.themoviedb.org/movie/81416",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Annie Claus Is Coming to Town",
  genres: ["TV Movie", "Family", "Fantasy", "Comedy", "Romance"],
  imdbId: "tt1910501",
  posterPath: "/2FQRruQv8oovcDu1etIdXC3IhFb.jpg",
  voteAverage: 6.3,
  streamingOn: ["UP Faith & Family Amazon Channel ", "UP Faith & Family Apple TV channel"],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
