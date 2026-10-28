import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const jojoSBizarreAdventureSeason5 = {
  id: "01a183d4-4632-71dc-99d4-e8ece74b5d66",
  type: "page-type/season",
  slug: "jojo-s-bizarre-adventure-season-5",
  description:
    "The legacy of the Joestar family continues with Jolyne as she and her companions take on new Stand users behind the bars of Green Dolphin Street Prison.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/jojo-s-bizarre-adventure"],
  position: 5,
  publishedAt: "2022-01-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "189107",
      externalLink: "https://www.themoviedb.org/tv/45790/season/5",
    },
  ],
  title: "STONE OCEAN",
  posterPath: "/pgfHO4mnozfDLYKjhgtaOZDq9Kc.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-28T18:44:49.318Z",
  updatedAt: "2026-10-28T18:44:49.318Z",
} as const satisfies Season
