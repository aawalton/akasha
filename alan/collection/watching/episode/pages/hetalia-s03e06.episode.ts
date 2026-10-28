import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS03e06 = {
  id: "01a183d7-7ce2-7290-9e73-266257228b35",
  type: "page-type/episode",
  slug: "hetalia-s03e06",
  description:
    "Continues the story of England's cold. In another story: China is tired of being pushed around by the other Allies.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-3"],
  position: 6,
  publishedAt: "2010-04-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797725",
      externalLink: "https://www.themoviedb.org/tv/35138/season/3/episode/6",
    },
  ],
  title: "America's Cold Cure",
  episodeType: "standard",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
