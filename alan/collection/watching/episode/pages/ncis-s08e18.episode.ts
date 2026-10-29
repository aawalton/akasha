import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS08e18 = {
  id: "01a1884b-ef6d-7b0d-afd7-327ebef6a750",
  type: "page-type/episode",
  slug: "ncis-s08e18",
  description:
    "Gibbs questions Vance's motives when he is asked to interrogate a teenage boy accused of killing his retired Marine father.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-8"],
  position: 18,
  publishedAt: "2011-03-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334586",
      externalLink: "https://www.themoviedb.org/tv/4614/season/8/episode/18",
    },
  ],
  title: "Out of the Frying Pan...",
  episodeType: "standard",
  stillPath: "/spXRtoPfd8aPBR9yys0l2WoNfuq.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
