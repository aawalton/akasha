import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monsterS01e05 = {
  id: "01a183d8-0265-7db4-85b9-0f00070a1b04",
  type: "page-type/episode",
  slug: "monster-s01e05",
  description:
    "Nina Fortner, a talented young student in Heidelberg has been having nightmares. She also cannot remember anything about her life before she was 10 years old. She soon suffers from fainting spells in university and starts receiving anonymous emails.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/monster-season-1"],
  position: 5,
  publishedAt: "2004-05-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "749518",
      externalLink: "https://www.themoviedb.org/tv/30981/season/1/episode/5",
    },
  ],
  title: "The Girl of Heidelberg",
  episodeType: "standard",
  stillPath: "/6FKz2pfpTlGXMxdH4h5op6j1aku.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-28T18:48:54.116Z",
  updatedAt: "2026-10-28T18:48:54.116Z",
} as const satisfies Episode
