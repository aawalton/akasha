import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS01e10 = {
  id: "01a183d1-bb4a-72f3-8df3-406e889ef42c",
  type: "page-type/episode",
  slug: "naruto-s01e10",
  description:
    "With Zabuza gone things are now settling and Tazuna can go and build the bridge without fear. Or so everyone thinks. Kakashi believes something is wrong with Zabuza's death and teaches Naruto, Sakura, and Sasuke a way to train so they could better use their chakra. Is Zabuza really dead?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-1"],
  position: 10,
  publishedAt: "2002-12-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908135",
      externalLink: "https://www.themoviedb.org/tv/46260/season/1/episode/10",
    },
  ],
  title: "The Forest of Chakra",
  episodeType: "standard",
  stillPath: "/mgSDvvVi16W2jDvulu5kHr3Zsrs.jpg",
  voteAverage: 7,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
