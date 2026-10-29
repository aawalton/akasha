import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e11 = {
  id: "01a18843-d154-75fe-bbef-5b1defd90ec0",
  type: "page-type/episode",
  slug: "bluey-s03e11",
  description:
    "Dad tries to teach Bluey how to play chess, but Mum thinks she is still too young. When Bingo joins in, the kids make up their own rules, but they still can't beat Dad.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 11,
  publishedAt: "2021-12-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3359687",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/11",
    },
  ],
  title: "Chest",
  episodeType: "standard",
  stillPath: "/lYCRZmh9zv0fjLHDdZahIx6g5S6.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
