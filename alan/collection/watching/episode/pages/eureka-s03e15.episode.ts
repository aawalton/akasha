import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS03e15 = {
  id: "01a18848-3732-73fd-bb1b-1afd428d5de0",
  type: "page-type/episode",
  slug: "eureka-s03e15",
  description:
    "Allison's baby shower fetches her a load of eco-friendly gifts and the discovery of a drowned scientist in a location where drowning is impossible.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-3"],
  position: 15,
  publishedAt: "2009-08-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335266",
      externalLink: "https://www.themoviedb.org/tv/4620/season/3/episode/15",
    },
  ],
  title: "Shower the People",
  episodeType: "standard",
  stillPath: "/4Q3Ppa4bnhtILTzmvWF9kCMN7xH.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
