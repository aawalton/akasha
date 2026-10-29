import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS21e05 = {
  id: "01a1884b-ef83-7817-98a5-57a8efa5beca",
  type: "page-type/episode",
  slug: "ncis-s21e05",
  description:
    "With the help of Knight's dad, NCIS works to unravel the mystery of a recently used service weapon belonging to a missing agent.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-21"],
  position: 5,
  publishedAt: "2024-03-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5190176",
      externalLink: "https://www.themoviedb.org/tv/4614/season/21/episode/5",
    },
  ],
  title: "The Plan",
  episodeType: "standard",
  stillPath: "/oKIwb1GN7up75G0EglcFtg1yM2S.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
