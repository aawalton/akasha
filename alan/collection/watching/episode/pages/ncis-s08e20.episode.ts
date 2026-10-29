import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS08e20 = {
  id: "01a1884b-ef6d-7332-956c-83f270bfcd0c",
  type: "page-type/episode",
  slug: "ncis-s08e20",
  description:
    "To Gibbs' displeasure, Special Agent E.J. Barrett returns to lead the investigation of a seaman's death that may be connected to a series of port-related murders.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-8"],
  position: 20,
  publishedAt: "2011-04-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334584",
      externalLink: "https://www.themoviedb.org/tv/4614/season/8/episode/20",
    },
  ],
  title: "Two-Faced",
  episodeType: "standard",
  stillPath: "/5eyPJ886TnGuxgXJEoJ3HSA0UmZ.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
