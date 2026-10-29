import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS01e03 = {
  id: "01a18843-d14c-7ce3-961f-781ca0897655",
  type: "page-type/episode",
  slug: "bluey-s01e03",
  description:
    "Bluey, Bingo and Mum are enjoying playing Keepy-Uppy around the house with their last balloon, when Dad joins in and the game becomes the ultimate test of skill.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-1"],
  position: 3,
  publishedAt: "2018-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1583481",
      externalLink: "https://www.themoviedb.org/tv/82728/season/1/episode/3",
    },
  ],
  title: "Keepy Uppy",
  episodeType: "standard",
  stillPath: "/rju1CL5ae40DmHSawZAr7GvVHKs.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
