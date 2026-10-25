import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const matchmakerMysteriesTheArtOfTheKill = {
  id: "01a1749a-464c-7e89-9031-01db3636fab1",
  type: "page-type/movie",
  slug: "matchmaker-mysteries-the-art-of-the-kill",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/matchmaker-mysteries"],
  position: 2,
  publishedAt: "2021-04-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "799360",
      externalLink: "https://www.themoviedb.org/movie/799360",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "MatchMaker Mysteries: The Art of the Kill",
  genres: ["Mystery", "Drama", "TV Movie", "Crime"],
  imdbId: "tt14192916",
  posterPath: "/4tzpiXAogo7pWUPLe07obKo9tPl.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
