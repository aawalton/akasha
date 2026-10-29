import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const andorS02e11 = {
  id: "01a18843-1871-742b-a7e8-ee5be054b06a",
  type: "page-type/episode",
  slug: "andor-s02e11",
  description: "Cassian returns to Coruscant for one last extraction.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-andor-season-2"],
  position: 11,
  publishedAt: "2025-05-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5747440",
      externalLink: "https://www.themoviedb.org/tv/83867/season/2/episode/11",
    },
  ],
  title: "Who Else Knows?",
  episodeType: "standard",
  stillPath: "/ngqDjWa6DUcxQRwwHpy0OSfgOBI.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:24:20.975Z",
  updatedAt: "2026-10-29T15:24:20.975Z",
} as const satisfies Episode
