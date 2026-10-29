import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS05e08 = {
  id: "01a18849-08b4-7b52-98f2-fb928aadb030",
  type: "page-type/episode",
  slug: "game-of-thrones-s05e08",
  description:
    "Arya makes progress in her training. Sansa confronts an old friend. Cersei struggles. Jon travels.",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-5"],
  position: 8,
  publishedAt: "2015-05-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1070282",
      externalLink: "https://www.themoviedb.org/tv/1399/season/5/episode/8",
    },
  ],
  title: "Hardhome",
  episodeType: "standard",
  stillPath: "/58PgfiE8eIOdQ1iDvFnJG471RFB.jpg",
  voteAverage: 9.3,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
