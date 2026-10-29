import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS10e14 = {
  id: "01a1884b-ef70-76b9-b933-a859c0b5dcf0",
  type: "page-type/episode",
  slug: "ncis-s10e14",
  description:
    "The NCIS team takes on a renowned hacker who could hold the key to tracking down the most-wanted cyber-terrorist in the world.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-10"],
  position: 14,
  publishedAt: "2013-02-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334687",
      externalLink: "https://www.themoviedb.org/tv/4614/season/10/episode/14",
    },
  ],
  title: "Canary",
  episodeType: "standard",
  stillPath: "/u1wfLrY8QxShMNwBomXm1QUOoYd.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
