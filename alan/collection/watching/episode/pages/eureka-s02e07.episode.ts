import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS02e07 = {
  id: "01a18848-3731-7150-81dd-db45d3732793",
  type: "page-type/episode",
  slug: "eureka-s02e07",
  description:
    "Fargo's grandfather awakens after 50 years in cryogenic suspension and accuses his rival of putting him there and stealing his work.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-2"],
  position: 7,
  publishedAt: "2007-08-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335246",
      externalLink: "https://www.themoviedb.org/tv/4620/season/2/episode/7",
    },
  ],
  title: "Family Reunion",
  episodeType: "standard",
  stillPath: "/tvXprjqvN8npiw9qhiV9MgGy9uf.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
