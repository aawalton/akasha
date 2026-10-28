import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS01e03 = {
  id: "01a183d1-bb4a-7ad9-b415-5697d1225003",
  type: "page-type/episode",
  slug: "naruto-s01e03",
  description:
    "On the way to becoming a ninja, Naruto must team up with his classmates, the pretty Sakura and the pretty serious Sasuke...",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-1"],
  position: 3,
  publishedAt: "2002-10-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1059123",
      externalLink: "https://www.themoviedb.org/tv/46260/season/1/episode/3",
    },
  ],
  title: "Sasuke and Sakura: Friends or Foes?",
  episodeType: "standard",
  stillPath: "/f4TFdgyxCJ7fF8J67WOfSGia1Av.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
