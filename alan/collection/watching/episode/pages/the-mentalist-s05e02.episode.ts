import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS05e02 = {
  id: "01a18880-75ea-7517-9962-3eababef8a33",
  type: "page-type/episode",
  slug: "the-mentalist-s05e02",
  description:
    "While the team investigates the murder of a diamond cutter, Jane meets a girl who claims to be his late daughter, Charlotte.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-mentalist-season-5"],
  position: 2,
  publishedAt: "2012-10-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367787",
      externalLink: "https://www.themoviedb.org/tv/5920/season/5/episode/2",
    },
  ],
  title: "Devil's Cherry",
  episodeType: "standard",
  stillPath: "/vJISe5uemqI3FmVMlUJFCmfx0c3.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
