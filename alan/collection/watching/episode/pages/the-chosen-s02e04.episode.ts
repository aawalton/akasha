import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theChosenS02e04 = {
  id: "01a18856-986a-7c6f-9299-413bfa2c4a08",
  type: "page-type/episode",
  slug: "the-chosen-s02e04",
  description:
    "As Jesus and the disciples head to Jerusalem to celebrate the Feast of Tabernacles, a new enemy follows them, while a familiar enemy awaits.",
  ownLength: 59,
  ownProgress: 0,
  partOfCollections: ["season/the-chosen-season-2"],
  position: 4,
  publishedAt: "2021-05-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2870900",
      externalLink: "https://www.themoviedb.org/tv/85077/season/2/episode/4",
    },
  ],
  title: "The Perfect Opportunity",
  episodeType: "standard",
  stillPath: "/bGfgX3nX5xgWOWzmvHcItyCXbtX.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:45:38.921Z",
  updatedAt: "2026-10-29T15:45:38.921Z",
} as const satisfies Episode
