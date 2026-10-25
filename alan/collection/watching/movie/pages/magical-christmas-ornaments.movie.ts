import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const magicalChristmasOrnaments = {
  id: "01a17499-c95e-74a9-87b8-00380917be97",
  type: "page-type/movie",
  slug: "magical-christmas-ornaments",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-12-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "483554",
      externalLink: "https://www.themoviedb.org/movie/483554",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Magical Christmas Ornaments",
  genres: ["Romance", "Drama", "TV Movie"],
  imdbId: "tt7642542",
  posterPath: "/tmxjY8lRviPwsTC09AUjINphumi.jpg",
  voteAverage: 6.012,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
