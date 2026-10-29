import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS15e17 = {
  id: "01a1884b-ef77-7691-b51e-e081634a60f0",
  type: "page-type/episode",
  slug: "ncis-s15e17",
  description:
    "Gibbs and Ducky are watching TV when they see the host handling a 200-year-old war stick that could be a match from a decade-old cold case.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-15"],
  position: 17,
  publishedAt: "2018-03-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1431929",
      externalLink: "https://www.themoviedb.org/tv/4614/season/15/episode/17",
    },
  ],
  title: "One Man's Trash",
  episodeType: "standard",
  stillPath: "/5VV9diNZ0eaoAe0Jgzoab0HcNG4.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
