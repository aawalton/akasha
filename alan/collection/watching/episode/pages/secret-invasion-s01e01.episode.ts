import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const secretInvasionS01e01 = {
  id: "01a1887f-6cfe-7c16-99cf-2df02a2a65f5",
  type: "page-type/episode",
  slug: "secret-invasion-s01e01",
  description: "Nick Fury learns of a clandestine invasion of Earth by Skrulls.",
  ownLength: 55,
  ownProgress: 55,
  partOfCollections: ["season/secret-invasion-miniseries"],
  position: 1,
  publishedAt: "2023-06-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2553098",
      externalLink: "https://www.themoviedb.org/tv/114472/season/1/episode/1",
    },
  ],
  title: "Resurrection",
  episodeType: "standard",
  stillPath: "/ag0i8z3xfsmlOWHkVB3T19mT7XW.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T16:30:14.782Z",
  updatedAt: "2026-10-29T16:30:14.782Z",
} as const satisfies Episode
