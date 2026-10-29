import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS08e15 = {
  id: "01a18857-c36e-7a62-b25c-0f09944914a2",
  type: "page-type/episode",
  slug: "the-office-s08e15",
  description:
    "Dwight arrives in Tallahassee with his team and sets out to win over the president of Sabre's special projects. Back in Scranton, Andy fills in for reception and enjoys himself.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-8"],
  position: 15,
  publishedAt: "2012-02-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170301",
      externalLink: "https://www.themoviedb.org/tv/2316/season/8/episode/15",
    },
  ],
  title: "Tallahassee",
  episodeType: "standard",
  stillPath: "/u6PMTaqsZm9EttcpKhB31bYuJjO.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
