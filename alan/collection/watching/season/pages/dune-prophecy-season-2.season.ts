import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const duneProphecySeason2 = {
  id: "01a18848-0146-7abd-8ff1-fbc649ee0313",
  type: "page-type/season",
  slug: "dune-prophecy-season-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/dune-prophecy"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "484478",
      externalLink: "https://www.themoviedb.org/tv/90228/season/2",
    },
  ],
  title: "Dune: Prophecy Season 2",
  posterPath: "/tEf8XSW9DN4RNxKlL0YOFtiXIZm.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:29:42.725Z",
  updatedAt: "2026-10-29T15:29:42.725Z",
} as const satisfies Season
