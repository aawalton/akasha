import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS17e10 = {
  id: "01a1884b-ef79-77a6-ae50-d8be7b88a32e",
  type: "page-type/episode",
  slug: "ncis-s17e10",
  description:
    'Gibbs and the team help Ziva with the "one thing" she said she\'d take care of before returning to her family.',
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-17"],
  position: 10,
  publishedAt: "2019-12-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1997166",
      externalLink: "https://www.themoviedb.org/tv/4614/season/17/episode/10",
    },
  ],
  title: "The North Pole",
  episodeType: "mid-season",
  stillPath: "/dYUhjpSN2VVPdwhQWJ2QgKktffA.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
