import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gintamaS01e10 = {
  id: "01a183d6-325f-7a93-9de8-83180c857cc5",
  type: "page-type/episode",
  slug: "gintama-s01e10",
  description: "The group picks up a giant white dog.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gintama-season-1"],
  position: 10,
  publishedAt: "2006-06-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "940284",
      externalLink: "https://www.themoviedb.org/tv/57041/season/1/episode/10",
    },
  ],
  title: "Eat Something Sour When You're Tired!",
  episodeType: "standard",
  stillPath: "/ApzluOGUxYmzP0lohqeVgoMEvvD.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Episode
