import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS01e24 = {
  id: "01a183d1-bb4b-754f-8922-ff00cfbea548",
  type: "page-type/episode",
  slug: "naruto-s01e24",
  description:
    "The first test of the Chuunin Exam is just that, a written test. When Ibiki issues a strict set of rules, Naruto fails to realize the true objective of the test. Can Naruto realize the truth before time runs out? And what about the tenth question?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-1"],
  position: 24,
  publishedAt: "2003-03-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908149",
      externalLink: "https://www.themoviedb.org/tv/46260/season/1/episode/24",
    },
  ],
  title: "Start Your Engines: The Chunin Exam Begins!",
  episodeType: "standard",
  stillPath: "/9GXCX3b9hBg2Dke5Y2UQTdC3h5T.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
