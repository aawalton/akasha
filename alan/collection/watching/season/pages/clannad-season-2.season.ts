import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const clannadSeason2 = {
  id: "01a183d7-50e1-7538-b8e0-9d154947a833",
  type: "page-type/season",
  slug: "clannad-season-2",
  description:
    "Events in After Story take place immediately after the first season, following Tomoya's final semester of high school. After declaring his love to Nagisa, they begin to have a close relationship. Their life together will be faced with unexpected challenges, as the truth behind the illusionary world and the city's legend come to light.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/clannad"],
  position: 2,
  publishedAt: "2008-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "35034",
      externalLink: "https://www.themoviedb.org/tv/24835/season/2",
    },
  ],
  title: "Clannad: After Story",
  posterPath: "/iDo1hYa2fghhVpotp9tDbCM5tPS.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-28T18:48:08.670Z",
  updatedAt: "2026-10-28T18:48:08.670Z",
} as const satisfies Season
