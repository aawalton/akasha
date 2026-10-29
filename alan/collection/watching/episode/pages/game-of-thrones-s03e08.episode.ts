import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS03e08 = {
  id: "01a18849-08b3-7ae4-a59b-4aa19c3986a7",
  type: "page-type/episode",
  slug: "game-of-thrones-s03e08",
  description: "Dany meets the Titan's Bastard; King's Landing hosts a royal wedding.",
  ownLength: 57,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-3"],
  position: 8,
  publishedAt: "2013-05-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "63085",
      externalLink: "https://www.themoviedb.org/tv/1399/season/3/episode/8",
    },
  ],
  title: "Second Sons",
  episodeType: "standard",
  stillPath: "/x3sJ9URXLn9hb6WAqqNhVJQGPut.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
