import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS03e01 = {
  id: "01a18851-3df5-71de-8e26-8fd221b6f92a",
  type: "page-type/episode",
  slug: "person-of-interest-s03e01",
  description:
    'The Machine, now completely self-governed with its whereabouts unknown, resumes giving Finch its "irrelevant" numbers for people in danger, which include a U.S. naval officer in town for Fleet Week. However, with so many sailors flooding the streets of New York City, finding the officer in time presents an even bigger challenge for Reese and Shaw.',
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-3"],
  position: 1,
  publishedAt: "2013-09-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64102",
      externalLink: "https://www.themoviedb.org/tv/1411/season/3/episode/1",
    },
  ],
  title: "Liberty",
  episodeType: "standard",
  stillPath: "/8GGoawCjJaK8KiWjdnMus9p6hIi.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
