import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS05e12 = {
  id: "01a18848-3734-7d18-ab33-77802f9a58ef",
  type: "page-type/episode",
  slug: "eureka-s05e12",
  description:
    "The people of Eureka are being kidnapped and replaced by body-doubles one by one unless Allison, Fargo and Zane can figure out how to avoid capture and save their town.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-5"],
  position: 12,
  publishedAt: "2012-07-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335302",
      externalLink: "https://www.themoviedb.org/tv/4620/season/5/episode/12",
    },
  ],
  title: "Double Take",
  episodeType: "standard",
  stillPath: "/dQE7t8ZJ5TlGTV2gumTEBeR2MIO.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
