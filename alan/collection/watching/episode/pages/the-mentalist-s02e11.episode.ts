import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS02e11 = {
  id: "01a18880-75e6-7db2-beb5-b0c7751c80c3",
  type: "page-type/episode",
  slug: "the-mentalist-s02e11",
  description:
    "Jane and company investigate the murder of a man and his wife, on her way to his fifteen year high school reunion where, clearly, the attendees haven't changed all that much.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-mentalist-season-2"],
  position: 11,
  publishedAt: "2010-01-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367724",
      externalLink: "https://www.themoviedb.org/tv/5920/season/2/episode/11",
    },
  ],
  title: "Rose-Colored Glasses",
  episodeType: "standard",
  stillPath: "/mH1oJjmzzFp65DUqv7BiJfCmwJd.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
