import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS06e04 = {
  id: "01a18849-08b4-7324-9108-ddc17db5209b",
  type: "page-type/episode",
  slug: "game-of-thrones-s06e04",
  description:
    "Tyrion strikes a deal. Jorah and Daario undertake a difficult task. Jaime and Cersei try to improve their situation.",
  ownLength: 59,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-6"],
  position: 4,
  publishedAt: "2016-05-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1186953",
      externalLink: "https://www.themoviedb.org/tv/1399/season/6/episode/4",
    },
  ],
  title: "Book of the Stranger",
  episodeType: "standard",
  stillPath: "/dY2DbzgIjIatJJCVRgk1gKTJWez.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
