import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS03e04 = {
  id: "01a18849-08b3-7221-9fae-035d85d737dd",
  type: "page-type/episode",
  slug: "game-of-thrones-s03e04",
  description:
    "The Night's Watch takes stock. Varys meets his better. Arya is taken to the commander of the Brotherhood. Dany exchanges a chain for a whip.",
  ownLength: 54,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-3"],
  position: 4,
  publishedAt: "2013-04-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "63082",
      externalLink: "https://www.themoviedb.org/tv/1399/season/3/episode/4",
    },
  ],
  title: "And Now His Watch Is Ended",
  episodeType: "standard",
  stillPath: "/veYx7AoKhxC8Pz8EThNpoOxeSGX.jpg",
  voteAverage: 8.8,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
