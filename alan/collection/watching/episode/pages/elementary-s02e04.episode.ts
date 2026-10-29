import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const elementaryS02e04 = {
  id: "01a1887e-62a7-756f-8ac1-73b4c4ddbcbd",
  type: "page-type/episode",
  slug: "elementary-s02e04",
  description:
    "When a financial consulting company CEO is poisoned to death, a woman from Sherlock's past who emerges as a possible suspect.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/elementary-season-2"],
  position: 4,
  publishedAt: "2013-10-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "971763",
      externalLink: "https://www.themoviedb.org/tv/1415/season/2/episode/4",
    },
  ],
  title: "Poison Pen",
  episodeType: "standard",
  stillPath: "/2xsqF4hmWxWa5I7aKptx37RqxTO.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:29:06.597Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Episode
