import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ironFistS02e01 = {
  id: "01a18849-c8d6-7b3f-93f0-6c25e7a3e675",
  type: "page-type/episode",
  slug: "iron-fist-s02e01",
  description:
    "While rival gangs battle for the soul of New York, Danny and Colleen cross paths with an old acquaintance. Joy embarks on a new adventure.",
  ownLength: 57,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-iron-fist-season-2"],
  position: 1,
  publishedAt: "2018-09-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1526698",
      externalLink: "https://www.themoviedb.org/tv/62127/season/2/episode/1",
    },
  ],
  title: "The Fury of Iron Fist",
  episodeType: "standard",
  stillPath: "/6ZPAI5mAwtO6yHnvKQuzEbhsyE0.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:31:39.349Z",
  updatedAt: "2026-10-29T15:31:39.349Z",
} as const satisfies Episode
