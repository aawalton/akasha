import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const goodWitchSomethingWicked = {
  id: "01a17499-8945-7910-a6e7-ef755bf1a7f5",
  type: "page-type/movie",
  slug: "good-witch-something-wicked",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["franchise/the-good-witch"],
  position: 8,
  publishedAt: "2015-10-24",
  status: "not-started",
  unit: "unit/minutes",
  title: "Good Witch: Something Wicked",
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
