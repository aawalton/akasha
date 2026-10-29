import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS01e02 = {
  id: "01a18843-d14c-77f9-8162-97c611336157",
  type: "page-type/episode",
  slug: "bluey-s01e02",
  description:
    "Doctor Bluey is needed when Dad gets a very curious x-ray from Nurse Bingo. It seems he has a cat in his tummy, leaving Bluey no choice but to operate immediately!",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-1"],
  position: 2,
  publishedAt: "2018-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1583479",
      externalLink: "https://www.themoviedb.org/tv/82728/season/1/episode/2",
    },
  ],
  title: "Hospital",
  episodeType: "standard",
  stillPath: "/8YoNM0dgSw6gqUtOoijsw1VyQi8.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
