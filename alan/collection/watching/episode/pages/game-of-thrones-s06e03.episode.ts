import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS06e03 = {
  id: "01a18849-08b4-72dd-ba9c-87ed9b054f80",
  type: "page-type/episode",
  slug: "game-of-thrones-s06e03",
  description: "Daenerys meets her future. Arya trains to be No One.",
  ownLength: 53,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-6"],
  position: 3,
  publishedAt: "2016-05-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1186952",
      externalLink: "https://www.themoviedb.org/tv/1399/season/6/episode/3",
    },
  ],
  title: "Oathbreaker",
  episodeType: "standard",
  stillPath: "/dNp7HBQbwKlgX76fwqM6SWUo5tU.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
