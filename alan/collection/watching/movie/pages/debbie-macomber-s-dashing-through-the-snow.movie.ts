import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const debbieMacomberSDashingThroughTheSnow = {
  id: "01a17499-8945-7e3f-a2db-84d327696cbb",
  type: "page-type/movie",
  slug: "debbie-macomber-s-dashing-through-the-snow",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2015-12-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "369052",
      externalLink: "https://www.themoviedb.org/movie/369052",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Debbie Macomber's Dashing Through the Snow",
  genres: ["TV Movie", "Family", "Mystery", "Romance"],
  imdbId: "tt5070196",
  posterPath: "/odsvdvoDLb1sIWHtzWojxZXQni2.jpg",
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
