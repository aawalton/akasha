import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS02e14 = {
  id: "01a18854-2006-7ee3-9015-665bb24b318d",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s02e14",
  description: "New information has our heroes taking on a dangerous mission.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-2"],
  position: 14,
  publishedAt: "2023-03-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4094492",
      externalLink: "https://www.themoviedb.org/tv/105971/season/2/episode/14",
    },
  ],
  title: "Tipping Point",
  episodeType: "standard",
  stillPath: "/dLa82VP14X7kThMWEyuWKtvFVz7.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
