import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monsterS01e19 = {
  id: "01a183d8-0266-7da7-b860-a66eb9449ec4",
  type: "page-type/episode",
  slug: "monster-s01e19",
  description:
    "Tenma visits Rudy, a criminal psychologist, who is working on cases involving a murderer named Jurgens.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/monster-season-1"],
  position: 19,
  publishedAt: "2004-08-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "749531",
      externalLink: "https://www.themoviedb.org/tv/30981/season/1/episode/19",
    },
  ],
  title: "Monster's Abyss",
  episodeType: "standard",
  stillPath: "/iedKDiD6BYGUX8In7gin7ZTC1e2.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-28T18:48:54.116Z",
  updatedAt: "2026-10-28T18:48:54.116Z",
} as const satisfies Episode
