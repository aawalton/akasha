import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS03e13 = {
  id: "01a18857-c368-7a0d-8f34-2b6ae2682b2e",
  type: "page-type/episode",
  slug: "the-office-s03e13",
  description:
    "Since Dwight's departure, Andy had been clinging to Michael. Andy's antics had been wearing very thin on his co-workers. In fact, Andy left Jim actually wishing Dwight would come back.",
  ownLength: 29,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-3"],
  position: 13,
  publishedAt: "2007-01-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170169",
      externalLink: "https://www.themoviedb.org/tv/2316/season/3/episode/13",
    },
  ],
  title: "The Return",
  episodeType: "standard",
  stillPath: "/41EKAvwyjrnO3TNVy66por6T6QZ.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
