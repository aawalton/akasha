import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS08e09 = {
  id: "01a18857-c36d-7062-8e67-92fd78433ca3",
  type: "page-type/episode",
  slug: "the-office-s08e09",
  description:
    "Robert California brings his wife into the office for a job, and tells Andy behind her back not to give her one which turns disastrous. Meanwhile, Dwight opens a gym in the building and tries to get Darryl to join it.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-8"],
  position: 9,
  publishedAt: "2011-12-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170312",
      externalLink: "https://www.themoviedb.org/tv/2316/season/8/episode/9",
    },
  ],
  title: "Mrs. California",
  episodeType: "standard",
  stillPath: "/kHxz6IFDzgNeo5KZt3JGElukbnH.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
