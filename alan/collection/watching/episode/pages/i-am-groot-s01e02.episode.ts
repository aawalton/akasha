import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const iAmGrootS01e02 = {
  id: "01a1887e-c695-756f-9207-434b9f533175",
  type: "page-type/episode",
  slug: "i-am-groot-s01e02",
  description:
    "Groot discovers a miniature civilization that believes the seemingly enormous tree toddler is the hero they’ve been waiting for.",
  ownLength: 6,
  ownProgress: 6,
  partOfCollections: ["season/i-am-groot-season-1"],
  position: 2,
  publishedAt: "2022-08-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4711224",
      externalLink: "https://www.themoviedb.org/tv/232125/season/1/episode/2",
    },
  ],
  title: "The Little Guy",
  episodeType: "standard",
  stillPath: "/6pFcTY18M9EpKQEEZZMzVnX4bMF.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T16:29:32.180Z",
  updatedAt: "2026-10-29T16:29:32.180Z",
} as const satisfies Episode
