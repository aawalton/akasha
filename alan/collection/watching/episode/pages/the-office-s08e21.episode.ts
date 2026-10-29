import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS08e21 = {
  id: "01a18857-c36e-7b09-be38-69749e9cb45f",
  type: "page-type/episode",
  slug: "the-office-s08e21",
  description:
    "Andy returns to the office to find Nellie in the manager's chair. Meanwhile, Kelly struggles to choose between Ryan and a new man.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-8"],
  position: 21,
  publishedAt: "2012-04-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170308",
      externalLink: "https://www.themoviedb.org/tv/2316/season/8/episode/21",
    },
  ],
  title: "Angry Andy",
  episodeType: "standard",
  stillPath: "/7UQJtATSIwVIACG351CjFOMU9Y1.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
