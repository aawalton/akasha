import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS06e03 = {
  id: "01a18857-c36b-7b04-8035-71b04b87d399",
  type: "page-type/episode",
  slug: "the-office-s06e03",
  description:
    "David Wallace comes bearing the news that not all the staffers will receive a raise this year. Jim pushes Dwight to the limit and causes him to form office alliances. And Pam decides she wants only cash as a wedding gift.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-6"],
  position: 3,
  publishedAt: "2009-10-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170189",
      externalLink: "https://www.themoviedb.org/tv/2316/season/6/episode/3",
    },
  ],
  title: "The Promotion",
  episodeType: "standard",
  stillPath: "/aQcBZoTjrScKTeBshUcs5OFNyUu.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
