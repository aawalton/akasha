import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const vinlandSagaSeason2 = {
  id: "01a183d4-e9fc-7290-b704-567d1e519d40",
  type: "page-type/season",
  slug: "vinland-saga-season-2",
  description:
    "As a new millennium dawns, Thorfinn struggles to find meaning in his life. Meanwhile, the new King of England seeks to expand his territory.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/vinland-saga"],
  position: 2,
  publishedAt: "2023-01-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "201464",
      externalLink: "https://www.themoviedb.org/tv/88803/season/2",
    },
  ],
  title: "Vinland Saga Season 2",
  posterPath: "/kHEaMqz3aHNoALObMTOJcOe8eK8.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:45:31.256Z",
  updatedAt: "2026-10-28T18:45:31.256Z",
} as const satisfies Season
