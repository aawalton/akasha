import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const andorS01e06 = {
  id: "01a18843-186f-71a3-9556-843166ed7aea",
  type: "page-type/episode",
  slug: "andor-s01e06",
  description:
    "With cover from a spectacular local festival, the Aldhani mission reaches a point of no return.",
  ownLength: 54,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-andor-season-1"],
  position: 6,
  publishedAt: "2022-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3745386",
      externalLink: "https://www.themoviedb.org/tv/83867/season/1/episode/6",
    },
  ],
  title: "The Eye",
  episodeType: "standard",
  stillPath: "/4cBo8DhpTWiy7dt3an2yTFdEIK0.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:24:20.975Z",
  updatedAt: "2026-10-29T15:24:20.975Z",
} as const satisfies Episode
