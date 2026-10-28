import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS03e10 = {
  id: "01a183d7-7ce2-754f-9191-d2c50b1d9e69",
  type: "page-type/episode",
  slug: "hetalia-s03e10",
  description:
    "Adapts from the strips In Just Two Minutes, You Can Grasp the Exterior of the European Economy, as well as more of Boss Spain.",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-3"],
  position: 10,
  publishedAt: "2010-05-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797729",
      externalLink: "https://www.themoviedb.org/tv/35138/season/3/episode/10",
    },
  ],
  title: "Switzerland and the Banks",
  episodeType: "standard",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
