import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theCaseOfTheWhitechapelVampire = {
  id: "01a17497-195e-78c9-ab65-1bfb637d8d3b",
  type: "page-type/movie",
  slug: "the-case-of-the-whitechapel-vampire",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2002-10-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "81382",
      externalLink: "https://www.themoviedb.org/movie/81382",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/The_Case_of_the_Whitechapel_Vampire",
    },
  ],
  title: "The Case of the Whitechapel Vampire",
  genres: ["Thriller", "Mystery", "Crime", "TV Movie"],
  imdbId: "tt0310851",
  posterPath: "/ueQqFcj093gptJfaFWaK91DUMO1.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Amazon MX Player",
    "Amazon Prime Video Free with Ads",
    "Cineverse",
    "Pluto TV",
    "The CW",
    "The Roku Channel",
    "Xumo Play",
    "YouTube Free",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Movie
