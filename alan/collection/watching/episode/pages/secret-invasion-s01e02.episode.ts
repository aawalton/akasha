import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const secretInvasionS01e02 = {
  id: "01a1887f-6cfe-7ae4-8d87-7dbe28d88b09",
  type: "page-type/episode",
  slug: "secret-invasion-s01e02",
  description: "Fury grapples with past and present.",
  ownLength: 56,
  ownProgress: 56,
  partOfCollections: ["season/secret-invasion-miniseries"],
  position: 2,
  publishedAt: "2023-06-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4327492",
      externalLink: "https://www.themoviedb.org/tv/114472/season/1/episode/2",
    },
  ],
  title: "Promises",
  episodeType: "standard",
  stillPath: "/cGVD3CaXswekowhRcJYZZhl85Y1.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T16:30:14.782Z",
  updatedAt: "2026-10-29T16:30:14.782Z",
} as const satisfies Episode
