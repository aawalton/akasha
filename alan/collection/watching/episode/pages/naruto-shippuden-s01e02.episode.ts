import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoShippudenS01e02 = {
  id: "01a183d2-3bd4-79a7-adb5-b5a919f37c66",
  type: "page-type/episode",
  slug: "naruto-shippuden-s01e02",
  description:
    "Naruto and Sakura team up and challenge Kakashi to a survival challenge to show off their progress.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/naruto-shippuden-season-1"],
  position: 2,
  publishedAt: "2007-02-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "761474",
      externalLink: "https://www.themoviedb.org/tv/31910/season/1/episode/2",
    },
  ],
  title: "The Akatsuki Makes Its Move",
  episodeType: "standard",
  stillPath: "/A9cFPkHjWoipVwyvk1W8Oj601n0.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:42:35.603Z",
  updatedAt: "2026-10-28T18:42:35.603Z",
} as const satisfies Episode
