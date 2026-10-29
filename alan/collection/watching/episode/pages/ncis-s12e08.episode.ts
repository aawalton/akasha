import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS12e08 = {
  id: "01a1884b-ef72-7d04-be8f-81798d2941f9",
  type: "page-type/episode",
  slug: "ncis-s12e08",
  description:
    "Gibbs searches for a way to clear a Navy Hospital Corpsman after she's indicted for illegally providing medical aid to the victims of a hit and run accident.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-12"],
  position: 8,
  publishedAt: "2014-11-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010125",
      externalLink: "https://www.themoviedb.org/tv/4614/season/12/episode/8",
    },
  ],
  title: "Semper Fortis",
  episodeType: "standard",
  stillPath: "/iWXQcDqzR2tybkgbWiF66FFBNf5.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
