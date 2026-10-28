import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS01e09 = {
  id: "01a183d1-bb4a-7840-b5de-0b0fe79c9780",
  type: "page-type/episode",
  slug: "naruto-s01e09",
  description:
    "With Kakashi free, the fight between him and Zabuza resumes. Kakashi decides to show Zabuza what the Sharingan is really capable of. Can Kakashi's Sharingan defeat Zabuza? And who is the mysterious person watching the fight?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-1"],
  position: 9,
  publishedAt: "2002-11-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1059129",
      externalLink: "https://www.themoviedb.org/tv/46260/season/1/episode/9",
    },
  ],
  title: "Kakashi: Sharingan Warrior",
  episodeType: "standard",
  stillPath: "/zPkIKMA53ysQZ2zj5inHwsXA2ME.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
