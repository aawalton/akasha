import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monsterS01e11 = {
  id: "01a183d8-0265-792d-a181-98634c4d114b",
  type: "page-type/episode",
  slug: "monster-s01e11",
  description:
    "Tenma learns that Johan used to be in an orphanage known as Kinderheim 511. And he meets a former East German official named Hartmann who used to work there and an injured boy named Dieter.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/monster-season-1"],
  position: 11,
  publishedAt: "2004-06-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "749526",
      externalLink: "https://www.themoviedb.org/tv/30981/season/1/episode/11",
    },
  ],
  title: "511 Kinderheim",
  episodeType: "standard",
  stillPath: "/ngPjRictfjaYKwIX1bV0JtfdDlM.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:48:54.116Z",
  updatedAt: "2026-10-28T18:48:54.116Z",
} as const satisfies Episode
