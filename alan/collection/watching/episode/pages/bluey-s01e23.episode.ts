import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS01e23 = {
  id: "01a18843-d14e-7623-a688-67035a7bd1b3",
  type: "page-type/episode",
  slug: "bluey-s01e23",
  description:
    "Playing 'Shops' is the best game ever for Bluey and her friends - if they can ever get started! With Bluey questioning the rules and changing who's who, they might be here all day!",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-1"],
  position: 23,
  publishedAt: "2018-10-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1597234",
      externalLink: "https://www.themoviedb.org/tv/82728/season/1/episode/23",
    },
  ],
  title: "Shops",
  episodeType: "standard",
  stillPath: "/hXcovq3Cu4hlc8UCvhIZDKkaYaG.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
