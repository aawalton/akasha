import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS10e09 = {
  id: "01a1884b-ef6f-79ec-8649-e6fc71b56f79",
  type: "page-type/episode",
  slug: "ncis-s10e09",
  description:
    "Gibbs teams up with FBI Agent Fornell on a joint NCIS/FBI investigation after Fornell becomes the target of a shooting, but they face an unexpected twist in the case when their mutual ex-wife, Diane Sterling, gets involved.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-10"],
  position: 9,
  publishedAt: "2012-12-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334679",
      externalLink: "https://www.themoviedb.org/tv/4614/season/10/episode/9",
    },
  ],
  title: "Devil's Trifecta",
  episodeType: "standard",
  stillPath: "/85aoWkhHIPbxAWxKQpAeszRzjWc.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
