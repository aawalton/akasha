import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackCloverS02e10 = {
  id: "01a183da-1967-70ad-b450-6289990a67ed",
  type: "page-type/episode",
  slug: "black-clover-s02e10",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/black-clover-season-2"],
  position: 10,
  publishedAt: "2026-12-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7903822",
      externalLink: "https://www.themoviedb.org/tv/73223/season/2/episode/10",
    },
  ],
  title: "Episode 10",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-28T18:51:11.067Z",
  updatedAt: "2026-10-28T18:51:11.067Z",
} as const satisfies Episode
