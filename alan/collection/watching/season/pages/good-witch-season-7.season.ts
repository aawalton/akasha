import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const goodWitchSeason7 = {
  id: "01a18849-352b-7d26-9785-4249d1d96b57",
  type: "page-type/season",
  slug: "good-witch-season-7",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/good-witch"],
  position: 7,
  publishedAt: "2021-05-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "179903",
      externalLink: "https://www.themoviedb.org/tv/61864/season/7",
    },
  ],
  title: "Good Witch Season 7",
  posterPath: "/FRthbnY1NaoOzBaB66YcMo8h8M.jpg",
  voteAverage: 5,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Season
