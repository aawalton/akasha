import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const haikyuSeason4 = {
  id: "01a183d2-cc4d-77c5-9812-2575676dab83",
  type: "page-type/season",
  slug: "haikyu-season-4",
  description:
    "New challenges lie ahead as the team prepares for Nationals. But when Kageyama is invited to a training camp, Hinata takes matters into his own hands.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/haikyu"],
  position: 4,
  publishedAt: "2020-01-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "120031",
      externalLink: "https://www.themoviedb.org/tv/60863/season/4",
    },
  ],
  title: "TO THE TOP",
  posterPath: "/M8dtn2nAserbnlAXCISjVL86Hj.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:43:12.581Z",
  updatedAt: "2026-10-28T18:43:12.581Z",
} as const satisfies Season
