import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theChosenS01e04 = {
  id: "01a18856-9869-73a6-b722-ced1be7f7e23",
  type: "page-type/episode",
  slug: "the-chosen-s01e04",
  description:
    "With his life and family under threat from Rome, Simon spends one last night fishing in a desperate attempt to square his debts. Andrew spots a familiar face waiting for them on the shores of Galilee.",
  ownLength: 47,
  ownProgress: 0,
  partOfCollections: ["season/the-chosen-season-1"],
  position: 4,
  publishedAt: "2019-04-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1757408",
      externalLink: "https://www.themoviedb.org/tv/85077/season/1/episode/4",
    },
  ],
  title: "The Rock on Which it is Built",
  episodeType: "standard",
  stillPath: "/7nr0gddCMIYTIT6OtAETG0HkEs2.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:45:38.921Z",
  updatedAt: "2026-10-29T15:45:38.921Z",
} as const satisfies Episode
