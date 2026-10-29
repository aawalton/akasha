import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS02e07 = {
  id: "01a18849-3528-7d69-97c3-90f847167d6d",
  type: "page-type/episode",
  slug: "good-witch-s02e07",
  description:
    "Cassie decides to host a surprise party for Martha, but after she enlists the help of Stephanie and Abigail, she finds out her secret might not be kept.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-2"],
  position: 7,
  publishedAt: "2016-05-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1187215",
      externalLink: "https://www.themoviedb.org/tv/61864/season/2/episode/7",
    },
  ],
  title: "What's Your Secret?",
  episodeType: "standard",
  stillPath: "/t7OyFqnYJttxxiDAEWQKS2WQjL1.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
