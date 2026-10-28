import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const jingleBellBride = {
  id: "01a1749a-06bd-713d-acc1-d1725fa36e21",
  type: "page-type/movie",
  slug: "jingle-bell-bride",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-10-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "737763",
      externalLink: "https://www.themoviedb.org/movie/737763",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Jingle Bell Bride",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt12877642",
  posterPath: "/ladbthyyye2ZbhmVRY5cVpkYuvm.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/pluto-tv",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
