import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const dragonBallSuperS01e10 = {
  id: "01a183dc-a491-79d0-a12d-0a8ca86280f1",
  type: "page-type/episode",
  slug: "dragon-ball-super-s01e10",
  description:
    "After successfully becoming a Super Saiyan God, Goku challenges Beerus to another fight.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/dragon-ball-super-season-1"],
  position: 10,
  publishedAt: "2015-09-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1101106",
      externalLink: "https://www.themoviedb.org/tv/62715/season/1/episode/10",
    },
  ],
  title: "Show Us, Goku! The Power of a Super Saiyan God!",
  episodeType: "standard",
  stillPath: "/cyAEMV5X4N6cp5PTlqvAI8CBBrW.jpg",
  voteAverage: 9.1,
  createdAt: "2026-10-28T18:53:57.776Z",
  updatedAt: "2026-10-28T18:53:57.776Z",
} as const satisfies Episode
