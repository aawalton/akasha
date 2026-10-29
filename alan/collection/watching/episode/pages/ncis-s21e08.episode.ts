import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS21e08 = {
  id: "01a1884b-ef83-7fb1-89a9-12bf10e1d7f7",
  type: "page-type/episode",
  slug: "ncis-s21e08",
  description:
    "The NCIS team looks for a motive behind the kidnapping and death of a famous heart surgeon.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-21"],
  position: 8,
  publishedAt: "2024-04-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5261582",
      externalLink: "https://www.themoviedb.org/tv/4614/season/21/episode/8",
    },
  ],
  title: "Heartless",
  episodeType: "standard",
  stillPath: "/1gp2hI5UyzVEOQFGyyuRyugCSZ2.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
