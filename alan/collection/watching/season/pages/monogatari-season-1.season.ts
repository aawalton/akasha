import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const monogatariSeason1 = {
  id: "01a183db-793e-72cd-911a-b8477ba295a2",
  type: "page-type/season",
  slug: "monogatari-season-1",
  description:
    "The story centers on Koyomi Araragi, a third year high school student who has recently survived a vampire attack, and finds himself mixed up with all kinds of apparitions: gods, ghosts, myths, and spirits.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/monogatari"],
  position: 1,
  publishedAt: "2009-07-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "54549",
      externalLink: "https://www.themoviedb.org/tv/46195/season/1",
    },
  ],
  title: "Bakemonogatari",
  posterPath: "/d7ql7zntjfCw9svB2nxMiJZSGKr.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-28T18:52:41.143Z",
  updatedAt: "2026-10-28T18:52:41.143Z",
} as const satisfies Season
