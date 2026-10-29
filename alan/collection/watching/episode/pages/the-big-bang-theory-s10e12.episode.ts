import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS10e12 = {
  id: "01a18856-4009-7c6d-b5ec-d5aef56107ae",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s10e12",
  description:
    "Sheldon and Amy visit Leonard and Penny for the first time since the holidays and share details about their terrible trip to Texas.",
  ownLength: 21,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-10"],
  position: 12,
  publishedAt: "2017-01-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1252065",
      externalLink: "https://www.themoviedb.org/tv/1418/season/10/episode/12",
    },
  ],
  title: "The Holiday Summation",
  episodeType: "standard",
  stillPath: "/e0nr2JM5ZgLXtJejueg1uTIti6H.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
