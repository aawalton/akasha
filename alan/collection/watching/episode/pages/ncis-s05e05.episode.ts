import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS05e05 = {
  id: "01a1884b-ef67-7783-8765-ae74aaa90894",
  type: "page-type/episode",
  slug: "ncis-s05e05",
  description:
    "The NCIS team are called in to stop a Naval officer from committing suicide by jumping off a rooftop, but when the suicide attempt turns into a murder, the NCIS team will have to find out who did it.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-5"],
  position: 5,
  publishedAt: "2007-10-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334454",
      externalLink: "https://www.themoviedb.org/tv/4614/season/5/episode/5",
    },
  ],
  title: "Leap of Faith",
  episodeType: "standard",
  stillPath: "/x1tALNyOsIDx9LnTxFT5RJQ1ekJ.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
