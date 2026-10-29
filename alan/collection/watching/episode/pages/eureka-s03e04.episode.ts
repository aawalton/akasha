import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS03e04 = {
  id: "01a18848-3732-7921-9af7-a461ffcb9395",
  type: "page-type/episode",
  slug: "eureka-s03e04",
  description:
    "It's Allison and Stark's wedding day and Carter finds himself reliving it over and over. Meanwhile, Carter's sister, Lexi, visits the town.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-3"],
  position: 4,
  publishedAt: "2008-08-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335256",
      externalLink: "https://www.themoviedb.org/tv/4620/season/3/episode/4",
    },
  ],
  title: "I Do Over",
  episodeType: "standard",
  stillPath: "/rtu5HSt2FZGBvrCxyVwkm0lEjBL.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
