import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const vinlandSagaSeason1 = {
  id: "01a183d4-e9fc-750f-995e-ec39be48ff20",
  type: "page-type/season",
  slug: "vinland-saga-season-1",
  description:
    "Thorfinn pursues a journey with his father's killer in order to take revenge and end his life in a duel as an honorable warrior and pay his father a homage.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/vinland-saga"],
  position: 1,
  publishedAt: "2019-07-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "123005",
      externalLink: "https://www.themoviedb.org/tv/88803/season/1",
    },
  ],
  title: "Vinland Saga Season 1",
  posterPath: "/vhasC3HdTY2pN94ww3r8RKdOGlr.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:45:31.256Z",
  updatedAt: "2026-10-28T18:45:31.256Z",
} as const satisfies Season
