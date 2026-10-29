import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS03e04 = {
  id: "01a18854-2007-7d4e-989c-5cff8ddc09ff",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s03e04",
  description: "Stranded in dangerous territory, Omega and Crosshair must work together.",
  ownLength: 28,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-3"],
  position: 4,
  publishedAt: "2024-02-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5093232",
      externalLink: "https://www.themoviedb.org/tv/105971/season/3/episode/4",
    },
  ],
  title: "A Different Approach",
  episodeType: "standard",
  stillPath: "/msTY5ERCuqkBC8N49fn3xvTLSc7.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
