import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const holidayUnplugged = {
  id: "01a1749a-c869-778c-9c6c-22961a60dd25",
  type: "page-type/movie",
  slug: "holiday-unplugged",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-11-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773357",
      externalLink: "https://www.themoviedb.org/movie/1773357",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Holiday Unplugged",
  genres: ["Romance"],
  imdbId: "tt46075500",
  posterPath: "/vFiym2U35GDreIiNpmHpvhKW17A.jpg",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
