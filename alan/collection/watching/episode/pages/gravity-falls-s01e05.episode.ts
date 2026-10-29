import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gravityFallsS01e05 = {
  id: "01a18849-545d-7e81-b9d8-77bc8a54ecc7",
  type: "page-type/episode",
  slug: "gravity-falls-s01e05",
  description:
    "Dipper is invited by Wendy and her teen friends on a trek that leads to an abandoned convenience store that may be haunted.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/gravity-falls-season-1"],
  position: 5,
  publishedAt: "2012-07-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "871285",
      externalLink: "https://www.themoviedb.org/tv/40075/season/1/episode/5",
    },
  ],
  title: "The Inconveniencing",
  episodeType: "standard",
  stillPath: "/og0nCOem2TSGX16fQl8cjiy4JOe.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:31:09.532Z",
  updatedAt: "2026-10-29T15:31:09.532Z",
} as const satisfies Episode
