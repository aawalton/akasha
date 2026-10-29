import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const parksAndRecreationS06e01 = {
  id: "01a18850-f8c1-78e9-837a-530771197afb",
  type: "page-type/episode",
  slug: "parks-and-recreation-s06e01",
  description:
    "Leslie wins an award from an international Women in Government organization, and travels to London with Ben, Andy, April and Ron to accept it.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/parks-and-recreation-season-6"],
  position: 1,
  publishedAt: "2013-09-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "397716",
      externalLink: "https://www.themoviedb.org/tv/8592/season/6/episode/1",
    },
  ],
  title: "London",
  episodeType: "standard",
  stillPath: "/mACiOfr2mNnylq4IGqqKDLMcK8f.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:39:30.361Z",
  updatedAt: "2026-10-29T15:39:30.361Z",
} as const satisfies Episode
