import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const myFavoriteBachelor = {
  id: "01a1749a-06be-7107-af5f-ecfb06af6696",
  type: "page-type/movie",
  slug: "my-favorite-bachelor",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2020-05-21",
  status: "not-started",
  unit: "unit/minutes",
  title: "My Favorite Bachelor",
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
