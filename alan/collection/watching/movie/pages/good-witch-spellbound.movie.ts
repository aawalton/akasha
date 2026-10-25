import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const goodWitchSpellbound = {
  id: "01a17499-c95c-7083-b42d-c35eaa441853",
  type: "page-type/movie",
  slug: "good-witch-spellbound",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["franchise/the-good-witch"],
  position: 11,
  publishedAt: "2017-10-22",
  status: "not-started",
  unit: "unit/minutes",
  title: "Good Witch: Spellbound",
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T20:45:07.643Z",
} as const satisfies Movie
