import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monsterS01e12 = {
  id: "01a183d8-0265-7fe8-8d84-67aa992d339e",
  type: "page-type/episode",
  slug: "monster-s01e12",
  description:
    "Dieter is picked up by Hartmann before Tenma could return. And Tenma learns more about the experiments in Kinderheim 511.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/monster-season-1"],
  position: 12,
  publishedAt: "2004-06-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "749524",
      externalLink: "https://www.themoviedb.org/tv/30981/season/1/episode/12",
    },
  ],
  title: "A Little Experiment",
  episodeType: "standard",
  stillPath: "/8a9l0cGDV9FDwkHcMgQw6IoD9ok.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:48:54.116Z",
  updatedAt: "2026-10-28T18:48:54.116Z",
} as const satisfies Episode
