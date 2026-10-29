import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS05e07 = {
  id: "01a18849-08b4-7557-bac4-8549f29358a6",
  type: "page-type/episode",
  slug: "game-of-thrones-s05e07",
  description:
    "Jon prepares for conflict. Sansa tries to talk to Theon. Brienne waits for a sign. Stannis remains stubborn. Jaime attempts to reconnect with family.",
  ownLength: 59,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-5"],
  position: 7,
  publishedAt: "2015-05-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1051288",
      externalLink: "https://www.themoviedb.org/tv/1399/season/5/episode/7",
    },
  ],
  title: "The Gift",
  episodeType: "standard",
  stillPath: "/n4BFZfiqOX1l5l6uYtpDS4m19WX.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
