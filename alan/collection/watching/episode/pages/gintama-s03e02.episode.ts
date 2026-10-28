import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gintamaS03e02 = {
  id: "01a183d6-3265-7378-8e27-f4116cb2fa3b",
  type: "page-type/episode",
  slug: "gintama-s03e02",
  description:
    "Some Shinsengumi member shows up, and it is soon revealed to be a rival of Hijikata.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gintama-season-3"],
  position: 2,
  publishedAt: "2008-04-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "940487",
      externalLink: "https://www.themoviedb.org/tv/57041/season/3/episode/2",
    },
  ],
  title: "Rules Are Made to be Broken",
  episodeType: "standard",
  stillPath: "/rc5HLvSfsend2E4pFzh99b6kfg9.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Episode
