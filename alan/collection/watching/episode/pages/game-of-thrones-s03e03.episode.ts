import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS03e03 = {
  id: "01a18849-08b3-7c7a-bb55-e6906cd286f5",
  type: "page-type/episode",
  slug: "game-of-thrones-s03e03",
  description:
    "Tyrion shoulders new responsibilities. Jon is taken to the Fist of the First Men. Daenerys meets with the slavers. Jaime strikes a deal with his captors.",
  ownLength: 53,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-3"],
  position: 3,
  publishedAt: "2013-04-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "63078",
      externalLink: "https://www.themoviedb.org/tv/1399/season/3/episode/3",
    },
  ],
  title: "Walk of Punishment",
  episodeType: "standard",
  stillPath: "/i39Itkd76DOXxek0blIO6rI6zsa.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
