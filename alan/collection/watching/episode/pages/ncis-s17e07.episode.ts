import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS17e07 = {
  id: "01a1884b-ef79-76ee-a125-9b24c56e447d",
  type: "page-type/episode",
  slug: "ncis-s17e07",
  description:
    "While investigating a Marine’s murder, the NCIS team uncovers a labyrinth of live-streaming spy cameras hidden in the rooms of a Virginia motel.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-17"],
  position: 7,
  publishedAt: "2019-11-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1961294",
      externalLink: "https://www.themoviedb.org/tv/4614/season/17/episode/7",
    },
  ],
  title: "No Vacancy",
  episodeType: "standard",
  stillPath: "/8IZFtkyaHHDbAfGpbRttrmzSDeo.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
