import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS07e18 = {
  id: "01a18857-c36d-7d54-8690-cf99829e88af",
  type: "page-type/episode",
  slug: "the-office-s07e18",
  description:
    "The office holds a garage sale in the warehouse. Michael decides to propose to Holly, and runs into trouble thinking of how to do it well.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-7"],
  position: 18,
  publishedAt: "2011-03-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170280",
      externalLink: "https://www.themoviedb.org/tv/2316/season/7/episode/18",
    },
  ],
  title: "Garage Sale",
  episodeType: "standard",
  stillPath: "/yetKixYDsAZEPN482rylmvGfzEZ.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
