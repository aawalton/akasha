import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const crusadeS01e10 = {
  id: "01a18845-c75e-7d1c-8fe3-f1d0a211da65",
  type: "page-type/episode",
  slug: "crusade-s01e10",
  description:
    "Galen warns Gideon not to explore a planet where the inhabitants were suddenly eradicated.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/crusade-season-1"],
  position: 10,
  publishedAt: "1999-08-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "147554",
      externalLink: "https://www.themoviedb.org/tv/2120/season/1/episode/10",
    },
  ],
  title: "The Memory of War",
  episodeType: "standard",
  stillPath: "/8vv97ea5S85nLPZpEcIn4YxQr6s.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:27:16.829Z",
  updatedAt: "2026-10-29T15:27:16.829Z",
} as const satisfies Episode
