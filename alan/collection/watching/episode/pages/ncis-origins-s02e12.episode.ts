import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisOriginsS02e12 = {
  id: "01a1884b-534a-789c-af25-d6fab4c4b6fe",
  type: "page-type/episode",
  slug: "ncis-origins-s02e12",
  description:
    "When the NIS Regional Director tries to transfer Mary Jo, she reconnects with an old friend from Atlantic City to help investigate the roadside deaths of two Marines.",
  ownLength: 40,
  ownProgress: 0,
  partOfCollections: ["season/ncis-origins-season-2"],
  position: 12,
  publishedAt: "2026-03-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6925034",
      externalLink: "https://www.themoviedb.org/tv/243006/season/2/episode/12",
    },
  ],
  title: "The Gambler",
  episodeType: "standard",
  stillPath: "/8yA7FEaVptheD3CkJmtlXncJtkf.jpg",
  voteAverage: 10,
  createdAt: "2026-10-29T15:33:20.328Z",
  updatedAt: "2026-10-29T15:33:20.328Z",
} as const satisfies Episode
