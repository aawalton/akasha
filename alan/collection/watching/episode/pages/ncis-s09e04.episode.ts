import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS09e04 = {
  id: "01a1884b-ef6e-7aad-8f1e-b26b31e004bd",
  type: "page-type/episode",
  slug: "ncis-s09e04",
  description:
    "The NCIS team searches for the person and motive behind a contract killer targeting a Navy Lieutenant Commander.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-9"],
  position: 4,
  publishedAt: "2011-10-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334594",
      externalLink: "https://www.themoviedb.org/tv/4614/season/9/episode/4",
    },
  ],
  title: "Enemy on the Hill",
  episodeType: "standard",
  stillPath: "/rZZMVAFT2qJBaVbqCwEtKLXiv1q.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
