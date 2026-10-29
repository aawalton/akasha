import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const secretInvasionS01e03 = {
  id: "01a1887f-6cfe-7d3a-9fd7-541600e746ce",
  type: "page-type/episode",
  slug: "secret-invasion-s01e03",
  description: "Fury uncovers a rebel Skrull plot.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/secret-invasion-miniseries"],
  position: 3,
  publishedAt: "2023-07-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4327493",
      externalLink: "https://www.themoviedb.org/tv/114472/season/1/episode/3",
    },
  ],
  title: "Betrayed",
  episodeType: "standard",
  stillPath: "/mS4jDXQmtVUluH05eGrmts4icUq.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T16:30:14.782Z",
  updatedAt: "2026-10-29T16:30:14.782Z",
} as const satisfies Episode
