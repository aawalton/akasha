import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS06e05 = {
  id: "01a1884b-ef68-729b-95c9-71379e087479",
  type: "page-type/episode",
  slug: "ncis-s06e05",
  description:
    "Gibbs' hunt for the killer of a Marine puts him on a collision course with an old friend.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-6"],
  position: 5,
  publishedAt: "2008-10-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334409",
      externalLink: "https://www.themoviedb.org/tv/4614/season/6/episode/5",
    },
  ],
  title: "Nine Lives",
  episodeType: "standard",
  stillPath: "/u1xsArDB7Wz4wzWsS7TEcDQ5xST.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
