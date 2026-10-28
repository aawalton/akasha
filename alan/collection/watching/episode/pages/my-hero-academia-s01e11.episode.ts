import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS01e11 = {
  id: "01a183d4-acc2-7712-8c2f-0e7033101112",
  type: "page-type/episode",
  slug: "my-hero-academia-s01e11",
  description:
    "The students of Class 1-A are up against the League of Villains. Will they survive long enough for help to arrive?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-1"],
  position: 11,
  publishedAt: "2016-06-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1183880",
      externalLink: "https://www.themoviedb.org/tv/65930/season/1/episode/11",
    },
  ],
  title: "Game Over",
  episodeType: "standard",
  stillPath: "/5fqO2bpH9MwUCwU5fqFscx0Yzm5.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
