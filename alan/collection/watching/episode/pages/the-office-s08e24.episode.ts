import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS08e24 = {
  id: "01a18857-c36e-7b7e-a5ad-90edf9b9f15d",
  type: "page-type/episode",
  slug: "the-office-s08e24",
  description:
    "Dwight offers free family portraits, and a stolen diaper leads to a high-speed car chase. With help from David Wallace, Andy goes undercover to try to get his job back. A new business opportunity arises for Robert California.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-8"],
  position: 24,
  publishedAt: "2012-05-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170310",
      externalLink: "https://www.themoviedb.org/tv/2316/season/8/episode/24",
    },
  ],
  title: "Free Family Portrait Studio",
  episodeType: "finale",
  stillPath: "/h2pkF8dBdUzMJDa7dOy0aI2FIL2.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
