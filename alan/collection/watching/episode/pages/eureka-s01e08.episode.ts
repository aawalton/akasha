import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS01e08 = {
  id: "01a18848-3730-7b1a-a8a8-babd44de8757",
  type: "page-type/episode",
  slug: "eureka-s01e08",
  description:
    "A former resident returns to Eureka and creates mayhem which threatens Global Dynamics, prompting Stark to take action.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-1"],
  position: 8,
  publishedAt: "2006-09-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335235",
      externalLink: "https://www.themoviedb.org/tv/4620/season/1/episode/8",
    },
  ],
  title: "Right as Raynes",
  episodeType: "standard",
  stillPath: "/8jD5B2ijlddQBhjJgKgi0cGkAp9.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
