import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS04e03 = {
  id: "01a18849-08b3-7caf-bc48-3b00ec1eca2d",
  type: "page-type/episode",
  slug: "game-of-thrones-s04e03",
  description:
    "Tyrion ponders his options; Tywin extends an olive branch; Jon proposes a bold plan; The Hound teaches Arya the way thing are.",
  ownLength: 57,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-4"],
  position: 3,
  publishedAt: "2014-04-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "63096",
      externalLink: "https://www.themoviedb.org/tv/1399/season/4/episode/3",
    },
  ],
  title: "Breaker of Chains",
  episodeType: "standard",
  stillPath: "/pgwGxEDIv1XyB5TcJcJM7EMLWiX.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
