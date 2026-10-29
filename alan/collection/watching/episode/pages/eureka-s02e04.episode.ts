import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS02e04 = {
  id: "01a18848-3731-7f46-bb68-dea523654c16",
  type: "page-type/episode",
  slug: "eureka-s02e04",
  description:
    "Carter suffers a blow to the head, and after arguing with Zoe, he suddenly finds himself in a parallel Eureka, where the residents seem to be mysteriously vanishing.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-2"],
  position: 4,
  publishedAt: "2007-07-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335243",
      externalLink: "https://www.themoviedb.org/tv/4620/season/2/episode/4",
    },
  ],
  title: "Games People Play",
  episodeType: "standard",
  stillPath: "/qQ5TSOoVzxRS6IVFhGHfTEWTTBY.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
