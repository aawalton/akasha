import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS10e03 = {
  id: "01a1884b-ef6f-7745-8e84-20e9509ab599",
  type: "page-type/episode",
  slug: "ncis-s10e03",
  description:
    "While on medical leave, Ducky orders the exhumation of a Navy Commander's body from a case closed 12 years ago. As a result, Gibbs tasks Ducky with a slightly different role on the investigation.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-10"],
  position: 3,
  publishedAt: "2012-10-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334673",
      externalLink: "https://www.themoviedb.org/tv/4614/season/10/episode/3",
    },
  ],
  title: "Phoenix",
  episodeType: "standard",
  stillPath: "/uz3HXs5RVEtrJxwhv56NnZSXIRP.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
