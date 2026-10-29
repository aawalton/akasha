import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hawkeyeS01e02 = {
  id: "01a1887e-af9c-712c-ac52-9c58f04383e9",
  type: "page-type/episode",
  slug: "hawkeye-s01e02",
  description:
    "Clint has to help Kate disentangle herself from the Tracksuit mafia and a real-life murder mystery.",
  ownLength: 52,
  ownProgress: 52,
  partOfCollections: ["season/hawkeye-miniseries"],
  position: 2,
  publishedAt: "2021-11-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3273258",
      externalLink: "https://www.themoviedb.org/tv/88329/season/1/episode/2",
    },
  ],
  title: "Hide and Seek",
  episodeType: "standard",
  stillPath: "/v6DjX5jATXUpkILMFMEOR61PWr5.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T16:29:26.300Z",
  updatedAt: "2026-10-29T16:29:26.300Z",
} as const satisfies Episode
