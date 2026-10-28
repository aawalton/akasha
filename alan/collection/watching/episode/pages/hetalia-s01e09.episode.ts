import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS01e09 = {
  id: "01a183d7-7cdf-7640-8b95-fe34fe18e05b",
  type: "page-type/episode",
  slug: "hetalia-s01e09",
  description:
    'The Allied Forces meet to discuss plans to take down the Axis, but despite their image as a "team" (America as the "hero" and everyone else acting as his backups), they find it difficult to get along and agree with each other.',
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-1"],
  position: 9,
  publishedAt: "2009-03-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797669",
      externalLink: "https://www.themoviedb.org/tv/35138/season/1/episode/9",
    },
  ],
  title: "Allied Forces Meeting",
  episodeType: "standard",
  stillPath: "/pOyCYryApf3fVdl1lsy2ui26wQN.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
