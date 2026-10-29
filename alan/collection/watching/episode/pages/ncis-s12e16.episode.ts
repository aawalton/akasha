import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS12e16 = {
  id: "01a1884b-ef72-722a-8cda-e00a42b1f1f3",
  type: "page-type/episode",
  slug: "ncis-s12e16",
  description:
    "A covert identity created for one of Gibbs’ undercover cases from 20 years ago resurfaces when a murder victim is found living under the alias.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-12"],
  position: 16,
  publishedAt: "2015-02-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1041742",
      externalLink: "https://www.themoviedb.org/tv/4614/season/12/episode/16",
    },
  ],
  title: "Blast from the Past",
  episodeType: "standard",
  stillPath: "/mWePFlGzN7FwDWVOcpVpJUFJ29h.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
