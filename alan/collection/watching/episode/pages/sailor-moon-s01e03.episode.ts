import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sailorMoonS01e03 = {
  id: "01a183d8-488f-7ca7-a2d7-b2a6037864f0",
  type: "page-type/episode",
  slug: "sailor-moon-s01e03",
  description:
    'All the girls in town are tuning in to the late-night radio program called "Midnight Zero" that reads out love letters sent in by the listeners. Meanwhile, a strange sleeping sickness is plaguing the town, causing people to fall into a coma-like state, including Ms. Haruna and Naru.',
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/sailor-moon-season-1"],
  position: 3,
  publishedAt: "1992-03-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "992279",
      externalLink: "https://www.themoviedb.org/tv/3570/season/1/episode/3",
    },
  ],
  title: "Talk Radio",
  episodeType: "standard",
  stillPath: "/xFnwbg8ElwP3Feft553JiXJ7wQM.jpg",
  voteAverage: 5.2,
  createdAt: "2026-10-28T18:49:12.078Z",
  updatedAt: "2026-10-28T18:49:12.078Z",
} as const satisfies Episode
