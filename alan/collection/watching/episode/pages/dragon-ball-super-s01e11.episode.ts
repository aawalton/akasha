import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const dragonBallSuperS01e11 = {
  id: "01a183dc-a492-735b-807f-c2285b2466e5",
  type: "page-type/episode",
  slug: "dragon-ball-super-s01e11",
  description: "The battle between gods continues.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/dragon-ball-super-season-1"],
  position: 11,
  publishedAt: "2015-09-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1108489",
      externalLink: "https://www.themoviedb.org/tv/62715/season/1/episode/11",
    },
  ],
  title: "Let's Keep Going, Lord Beerus! The Battle of Gods!",
  episodeType: "standard",
  stillPath: "/icjxZcyrPmDBcdO7jZWzLluxvzE.jpg",
  voteAverage: 9,
  createdAt: "2026-10-28T18:53:57.776Z",
  updatedAt: "2026-10-28T18:53:57.776Z",
} as const satisfies Episode
