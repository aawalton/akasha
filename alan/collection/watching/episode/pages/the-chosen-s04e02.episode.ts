import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theChosenS04e02 = {
  id: "01a18856-986b-7368-ac2b-7eb20f3c4e74",
  type: "page-type/episode",
  slug: "the-chosen-s04e02",
  description:
    'Jesus founds his church on unholy ground and Simon goes public with Jesus\' true identity, getting a new name in the process. But can the new "Peter" forgive old wrongs?',
  ownLength: 81,
  ownProgress: 0,
  partOfCollections: ["season/the-chosen-season-4"],
  position: 2,
  publishedAt: "2024-06-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4828946",
      externalLink: "https://www.themoviedb.org/tv/85077/season/4/episode/2",
    },
  ],
  title: "Confessions",
  episodeType: "standard",
  stillPath: "/kmo0nnMDlrROFZLXqvSzRxv1E0T.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:45:38.921Z",
  updatedAt: "2026-10-29T15:45:38.921Z",
} as const satisfies Episode
