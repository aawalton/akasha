import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const smartCookies = {
  id: "01a17499-66a1-7f06-a19f-460468aa657a",
  type: "page-type/movie",
  slug: "smart-cookies",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2012-08-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "146171",
      externalLink: "https://www.themoviedb.org/movie/146171",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Smart Cookies",
  genres: ["Adventure", "TV Movie"],
  imdbId: "tt2339647",
  posterPath: "/Aj1SkPpMuJ3L9pbWOVaJgWZQOvN.jpg",
  voteAverage: 6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Tubi TV",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
