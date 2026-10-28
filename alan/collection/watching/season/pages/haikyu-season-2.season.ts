import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const haikyuSeason2 = {
  id: "01a183d2-cc4d-7804-9249-fc57983739f7",
  type: "page-type/season",
  slug: "haikyu-season-2",
  description:
    "Hinata, Kageyama and the rest of Team Karasuno head to Nekoma's special training camp in Tokyo to prepare for the Spring High Tournament.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/haikyu"],
  position: 2,
  publishedAt: "2015-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "71126",
      externalLink: "https://www.themoviedb.org/tv/60863/season/2",
    },
  ],
  title: "Haikyu!! Season 2",
  posterPath: "/3TUUTiiuvjKg8BcnrGbuuj2Ov5L.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:43:12.581Z",
  updatedAt: "2026-10-28T18:43:12.581Z",
} as const satisfies Season
