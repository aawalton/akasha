import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const snowWhiteTheFairestOfThemAll = {
  id: "01a17497-195d-7085-9f4c-599b2370d0e1",
  type: "page-type/movie",
  slug: "snow-white-the-fairest-of-them-all",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2001-10-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/Snow_White:_The_Fairest_of_Them_All",
    },
  ],
  title: "Snow White: The Fairest of Them All",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Movie
