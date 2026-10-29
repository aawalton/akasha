import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS05e10 = {
  id: "01a18848-3734-7577-a668-437e23495b73",
  type: "page-type/episode",
  slug: "eureka-s05e10",
  description:
    "Jack and Allison's perfect honeymoon is interrupted when sabotage is discovered in Eureka. Elsewhere, Holly faces another hurdle to remain intact.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-5"],
  position: 10,
  publishedAt: "2012-06-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335304",
      externalLink: "https://www.themoviedb.org/tv/4620/season/5/episode/10",
    },
  ],
  title: "The Honeymooners",
  episodeType: "standard",
  stillPath: "/nQrNavZdfxGqFyz77zENEUCcARK.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
