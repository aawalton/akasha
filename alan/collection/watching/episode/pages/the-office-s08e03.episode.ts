import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS08e03 = {
  id: "01a18857-c36d-70bf-8d8c-34a63e308f18",
  type: "page-type/episode",
  slug: "the-office-s08e03",
  description:
    "The entire warehouse staff quits after winning the lotto, leaving Andy and Darryl to scramble for replacements while several of the office workers get a taste of the warehouse life.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-8"],
  position: 3,
  publishedAt: "2011-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170292",
      externalLink: "https://www.themoviedb.org/tv/2316/season/8/episode/3",
    },
  ],
  title: "Lotto",
  episodeType: "standard",
  stillPath: "/mnZZCEkc1cqolo1U60cB0NHBeU.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
