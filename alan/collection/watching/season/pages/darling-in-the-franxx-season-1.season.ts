import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const darlingInTheFranxxSeason1 = {
  id: "01a183dd-af80-74da-a72c-e248ae6bd3c0",
  type: "page-type/season",
  slug: "darling-in-the-franxx-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/darling-in-the-franxx"],
  position: 1,
  publishedAt: "2018-01-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "97439",
      externalLink: "https://www.themoviedb.org/tv/76121/season/1",
    },
  ],
  title: "DARLING in the FRANXX Season 1",
  posterPath: "/rR8HgnD9tqFaSiJ69FpruHo9Gm9.jpg",
  voteAverage: 7,
  createdAt: "2026-10-28T18:55:06.111Z",
  updatedAt: "2026-10-28T18:55:06.111Z",
} as const satisfies Season
