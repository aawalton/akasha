import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aGunfighterSPledge = {
  id: "01a17499-470a-7705-8281-870f3e586657",
  type: "page-type/movie",
  slug: "a-gunfighter-s-pledge",
  ownLength: 79,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2008-07-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "125400",
      externalLink: "https://www.themoviedb.org/movie/125400",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/A_Gunfighter's_Pledge" },
  ],
  title: "A Gunfighter's Pledge",
  genres: ["Western", "Action", "TV Movie"],
  imdbId: "tt1146439",
  posterPath: "/u0BWQkfwrD5MD6lQlFgLACmrBya.jpg",
  voteAverage: 5.2,
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
