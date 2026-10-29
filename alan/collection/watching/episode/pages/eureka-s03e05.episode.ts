import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS03e05 = {
  id: "01a18848-3732-7015-bccd-9e15ca5f3be1",
  type: "page-type/episode",
  slug: "eureka-s03e05",
  description:
    "A search for a mummy ensues after a famed archaeologist opens the tomb of an Egyptian queen at Global Dynamics.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-3"],
  position: 5,
  publishedAt: "2008-08-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335257",
      externalLink: "https://www.themoviedb.org/tv/4620/season/3/episode/5",
    },
  ],
  title: "Show Me the Mummy",
  episodeType: "standard",
  stillPath: "/7eGLLmet961oreWWxWaNmQbJMll.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
