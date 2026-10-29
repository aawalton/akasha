import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS19e01 = {
  id: "01a1884b-ef7b-7a78-80a1-4442c6392a83",
  type: "page-type/episode",
  slug: "ncis-s19e01",
  description:
    "As the NCIS team searches for Gibbs after wreckage from his boat is discovered, they find out he was tracking a serial killer with journalist Marcie Warren, who wrote an exposé on him.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-19"],
  position: 1,
  publishedAt: "2021-09-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3070164",
      externalLink: "https://www.themoviedb.org/tv/4614/season/19/episode/1",
    },
  ],
  title: "Blood in the Water",
  episodeType: "standard",
  stillPath: "/mMobF6gFLTSj0XoVHam70imCt7w.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
