import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mcbrideAnybodyHereMurderMarty = {
  id: "01a17497-3828-77b4-96be-f9b8fc33626a",
  type: "page-type/movie",
  slug: "mcbride-anybody-here-murder-marty",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/mcbride"],
  position: 5,
  publishedAt: "2005-08-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "256307",
      externalLink: "https://www.themoviedb.org/movie/256307",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "McBride: Anybody Here Murder Marty?",
  genres: ["Mystery", "Drama", "Crime"],
  imdbId: "tt0468514",
  posterPath: "/pD7ZcPzgKAlO7mRVgbnH7wUMSCs.jpg",
  voteAverage: 7.4,
  streamingOn: ["UP Faith & Family Amazon Channel ", "UP Faith & Family Apple TV channel"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
