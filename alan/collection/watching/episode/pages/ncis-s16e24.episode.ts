import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS16e24 = {
  id: "01a1884b-ef78-78a4-a6d8-3c083c949f51",
  type: "page-type/episode",
  slug: "ncis-s16e24",
  description:
    "Former FBI Agent Tobias Fornell pleads with Gibbs to do whatever is necessary to take down drug dealers and suppliers in the area after his daughter, Emily Fornell, is hospitalized from an opiate overdose.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-16"],
  position: 24,
  publishedAt: "2019-05-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1779351",
      externalLink: "https://www.themoviedb.org/tv/4614/season/16/episode/24",
    },
  ],
  title: "Daughters",
  episodeType: "finale",
  stillPath: "/wQte0P7YJSOVo6ZV0npCifbrZeN.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
