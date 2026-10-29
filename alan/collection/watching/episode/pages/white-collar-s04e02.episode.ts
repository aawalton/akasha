import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS04e02 = {
  id: "01a18881-51a2-788a-9cc6-8ef95d86e24f",
  type: "page-type/episode",
  slug: "white-collar-s04e02",
  description:
    "Peter comes up with a strategy to return Neal to the U.S. before Collins catches him.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/white-collar-season-4"],
  position: 2,
  publishedAt: "2012-07-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "596293",
      externalLink: "https://www.themoviedb.org/tv/21510/season/4/episode/2",
    },
  ],
  title: "Most Wanted",
  episodeType: "standard",
  stillPath: "/cXlBQnrMgw0Y51xPtWSB7PyauWy.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
