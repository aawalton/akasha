import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theChosenS01e01 = {
  id: "01a18856-9869-7266-9f1d-d034457bcd96",
  type: "page-type/episode",
  slug: "the-chosen-s01e01",
  description:
    "Two brothers struggle with their tax debts to Rome while a woman in the Red Quarter wrestles with her demons.",
  ownLength: 55,
  ownProgress: 0,
  partOfCollections: ["season/the-chosen-season-1"],
  position: 1,
  publishedAt: "2019-04-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1757405",
      externalLink: "https://www.themoviedb.org/tv/85077/season/1/episode/1",
    },
  ],
  title: "I Have Called You by Name",
  episodeType: "standard",
  stillPath: "/eOJOHuAVF8n01jZGKuD8e5f3otL.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:45:38.921Z",
  updatedAt: "2026-10-29T15:45:38.921Z",
} as const satisfies Episode
