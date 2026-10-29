import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS18e01 = {
  id: "01a1884b-ef7a-7e55-a687-0d66d3d63a37",
  type: "page-type/episode",
  slug: "ncis-s18e01",
  description:
    "Gibbs and Fornell attempt to track down the leader of a drug ring who supplied drugs to Fornell's daughter.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-18"],
  position: 1,
  publishedAt: "2020-11-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2492768",
      externalLink: "https://www.themoviedb.org/tv/4614/season/18/episode/1",
    },
  ],
  title: "Sturgeon Season",
  episodeType: "standard",
  stillPath: "/tThwJrv5oQ5Q4Qbj9WPV9EtR59C.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
