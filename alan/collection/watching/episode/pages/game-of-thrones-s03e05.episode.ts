import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS03e05 = {
  id: "01a18849-08b3-7ad6-bb44-df0094191e67",
  type: "page-type/episode",
  slug: "game-of-thrones-s03e05",
  description:
    "The Hound is judged by the gods. Jaime is judged by men. Jon proves himself. Robb is betrayed. Tyrion learns the cost of weddings.",
  ownLength: 58,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-3"],
  position: 5,
  publishedAt: "2013-04-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "63083",
      externalLink: "https://www.themoviedb.org/tv/1399/season/3/episode/5",
    },
  ],
  title: "Kissed by Fire",
  episodeType: "standard",
  stillPath: "/w0K3DtYweVJdpRLg33CRLtwCXjp.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
