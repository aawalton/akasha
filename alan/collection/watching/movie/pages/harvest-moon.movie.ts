import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const harvestMoon = {
  id: "01a17499-8945-7419-b010-ad01862e8993",
  type: "page-type/movie",
  slug: "harvest-moon",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2015-10-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "361746",
      externalLink: "https://www.themoviedb.org/movie/361746",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Harvest Moon",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt5076184",
  posterPath: "/x6vNuIcObszzgoAUd9ZMGGiGh5h.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
