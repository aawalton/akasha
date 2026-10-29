import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS05e13 = {
  id: "01a18857-c36a-77ad-b53b-39d0aff1c502",
  type: "page-type/episode",
  slug: "the-office-s05e13",
  description:
    "Dwight must makes amends with the office after his fire safety seminar goes awry; Michael tries to get his employees to relax; Andy becomes convinced that Pam and Jim are film gurus.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-5"],
  position: 13,
  publishedAt: "2009-02-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170228",
      externalLink: "https://www.themoviedb.org/tv/2316/season/5/episode/13",
    },
  ],
  title: "Stress Relief",
  episodeType: "standard",
  stillPath: "/vOW6G304cwyT7Uh2d31y8IHR4IN.jpg",
  voteAverage: 9.1,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
