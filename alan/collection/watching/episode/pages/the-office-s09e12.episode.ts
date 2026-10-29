import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS09e12 = {
  id: "01a18857-c36f-75d0-8105-e656f5dfa33d",
  type: "page-type/episode",
  slug: "the-office-s09e12",
  description:
    "Dwight tries to stop Darryl from moving to Jim's start-up company. Jim misses his daughter's first recital, to Pam's dismay. Nellie spills the beans about Pete and Erin.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-9"],
  position: 12,
  publishedAt: "2013-01-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170324",
      externalLink: "https://www.themoviedb.org/tv/2316/season/9/episode/12",
    },
  ],
  title: "Customer Loyalty",
  episodeType: "standard",
  stillPath: "/pfOP5WZIkDNifAfXwQ7H84ZrqTv.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
