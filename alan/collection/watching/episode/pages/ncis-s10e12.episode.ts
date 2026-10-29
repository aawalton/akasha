import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS10e12 = {
  id: "01a1884b-ef70-72e7-9e88-d231cc9655e9",
  type: "page-type/episode",
  slug: "ncis-s10e12",
  description:
    "In the aftermath of an event that strikes close to home, the NCIS team unites to seek answers and demand justice in order to protect their most vulnerable colleagues.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-10"],
  position: 12,
  publishedAt: "2013-01-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334683",
      externalLink: "https://www.themoviedb.org/tv/4614/season/10/episode/12",
    },
  ],
  title: "Shiva",
  episodeType: "standard",
  stillPath: "/sQeT9AKjDg5v2CzFLyC2gwb6lEq.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
