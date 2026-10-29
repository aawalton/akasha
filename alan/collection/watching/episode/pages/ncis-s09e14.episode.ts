import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS09e14 = {
  id: "01a1884b-ef6e-7c68-b576-94e468570e9a",
  type: "page-type/episode",
  slug: "ncis-s09e14",
  description:
    "During a routine stop for his morning coffee, Gibbs finds himself staring down the barrel of a gun, forcing him to question choices he has made in the past and present.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-9"],
  position: 14,
  publishedAt: "2012-02-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334603",
      externalLink: "https://www.themoviedb.org/tv/4614/season/9/episode/14",
    },
  ],
  title: "Life Before His Eyes",
  episodeType: "standard",
  stillPath: "/lopn9ZzbybIiWVP1Ywaj4wSNbhA.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
