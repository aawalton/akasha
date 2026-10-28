import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoShippudenS01e04 = {
  id: "01a183d2-3bd4-7385-b452-794586d9fc8e",
  type: "page-type/episode",
  slug: "naruto-shippuden-s01e04",
  description:
    "Gaara is quick to detect Deidara’s presence, and an aerial battle ensues with Deidara on his giant bird and Gaara atop sand.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/naruto-shippuden-season-1"],
  position: 4,
  publishedAt: "2007-03-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "761475",
      externalLink: "https://www.themoviedb.org/tv/31910/season/1/episode/4",
    },
  ],
  title: "The Jinchuriki of the Sand",
  episodeType: "standard",
  stillPath: "/qiYNA4LdqhBZbM0kBqBv5MASvVs.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-28T18:42:35.603Z",
  updatedAt: "2026-10-28T18:42:35.603Z",
} as const satisfies Episode
