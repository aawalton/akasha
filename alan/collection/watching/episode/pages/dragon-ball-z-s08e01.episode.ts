import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const dragonBallZS08e01 = {
  id: "01a183dc-561f-70ab-b3cb-1064925f6068",
  type: "page-type/episode",
  slug: "dragon-ball-z-s08e01",
  description:
    "The Z-Fighters race to stop Babidi’s cronies from delivering the pure energy that will be used resurrect the dreaded Majin Buu. Will they find Babidi’s hidden spaceship in time?",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/dragon-ball-z-season-8"],
  position: 1,
  publishedAt: "1994-03-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "969802",
      externalLink: "https://www.themoviedb.org/tv/12971/season/8/episode/1",
    },
  ],
  title: "The Wizard's Curse",
  episodeType: "standard",
  stillPath: "/AdhFy23WoUlp6iCaYPEVZEcZ15B.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:53:37.679Z",
  updatedAt: "2026-10-28T18:53:37.679Z",
} as const satisfies Episode
