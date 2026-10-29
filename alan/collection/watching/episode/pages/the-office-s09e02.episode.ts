import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS09e02 = {
  id: "01a18857-c36e-7852-ab7d-938e91f208a6",
  type: "page-type/episode",
  slug: "the-office-s09e02",
  description:
    "A toast at Roy's wedding leads to Pam and Jim searching their relationships for buried secrets; Dwight reacts to Nellie's mandatory charity initiative.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-9"],
  position: 2,
  publishedAt: "2012-09-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170316",
      externalLink: "https://www.themoviedb.org/tv/2316/season/9/episode/2",
    },
  ],
  title: "Roy's Wedding",
  episodeType: "standard",
  stillPath: "/f3eB97S8bG6YMppV6rJDU3jCbZ5.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
