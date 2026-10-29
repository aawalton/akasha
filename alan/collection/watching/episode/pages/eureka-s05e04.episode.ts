import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS05e04 = {
  id: "01a18848-3734-751d-a430-588f0cbe0d73",
  type: "page-type/episode",
  slug: "eureka-s05e04",
  description:
    "When a smart fire experiment gets out of control, Carter and team discover that the Astraeus victims may be the cause.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-5"],
  position: 4,
  publishedAt: "2012-05-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335297",
      externalLink: "https://www.themoviedb.org/tv/4620/season/5/episode/4",
    },
  ],
  title: "Friendly Fire",
  episodeType: "standard",
  stillPath: "/aGRPzEbGqMXSTCf0Nc3m5kiLEPZ.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
