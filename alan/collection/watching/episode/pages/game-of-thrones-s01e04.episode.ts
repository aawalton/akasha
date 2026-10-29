import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS01e04 = {
  id: "01a18849-08b1-7110-bb2d-048383568fec",
  type: "page-type/episode",
  slug: "game-of-thrones-s01e04",
  description:
    "Eddard investigates Jon Arryn's murder. Jon befriends Samwell Tarly, a coward who has come to join the Night's Watch.",
  ownLength: 56,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-1"],
  position: 4,
  publishedAt: "2011-05-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "63059",
      externalLink: "https://www.themoviedb.org/tv/1399/season/1/episode/4",
    },
  ],
  title: "Cripples, Bastards, and Broken Things",
  episodeType: "standard",
  stillPath: "/Ai2UPMWv38xGjOgNBuA1o8w8dUI.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
