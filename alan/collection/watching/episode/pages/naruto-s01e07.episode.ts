import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS01e07 = {
  id: "01a183d1-bb4a-7e4b-97f7-aa24679e2a9a",
  type: "page-type/episode",
  slug: "naruto-s01e07",
  description:
    "Naruto and his squad arrive in the Land of the Waves and learn that an evil businessman named Gato has taken over the land.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-1"],
  position: 7,
  publishedAt: "2002-11-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1059127",
      externalLink: "https://www.themoviedb.org/tv/46260/season/1/episode/7",
    },
  ],
  title: "The Assassin of the Mist!",
  episodeType: "standard",
  stillPath: "/hCux6yOMEr0aTASISowEYR5HNm6.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
