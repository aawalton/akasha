import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS01e05 = {
  id: "01a183d1-bb4a-706e-a6c5-52ec374affaa",
  type: "page-type/episode",
  slug: "naruto-s01e05",
  description:
    "With the threat of failure hanging over their heads, Naruto, Sasuke and Sakura try everything they know to pass the grueling survival test.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-1"],
  position: 5,
  publishedAt: "2002-10-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1059125",
      externalLink: "https://www.themoviedb.org/tv/46260/season/1/episode/5",
    },
  ],
  title: "You Failed! Kakashi's Final Decision",
  episodeType: "standard",
  stillPath: "/6DUDSdvZIq4ebWB56EXPWNIt7Yp.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
