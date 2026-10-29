import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS08e07 = {
  id: "01a1884b-ef6c-78ed-8916-f2d466bfe337",
  type: "page-type/episode",
  slug: "ncis-s08e07",
  description:
    "The team is surprised when Gibbs asks Tony's father to join them in a murder investigation.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-8"],
  position: 7,
  publishedAt: "2010-11-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334573",
      externalLink: "https://www.themoviedb.org/tv/4614/season/8/episode/7",
    },
  ],
  title: "Broken Arrow",
  episodeType: "standard",
  stillPath: "/mo4iYhP6tdZwBNrxDbDbBVl97KH.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
