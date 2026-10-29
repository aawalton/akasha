import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS07e04 = {
  id: "01a18849-08b5-7742-94f4-b18ffe4757f1",
  type: "page-type/episode",
  slug: "game-of-thrones-s07e04",
  description: "The Lannisters pay their debts. Daenerys weighs her options. Arya comes home.",
  ownLength: 50,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-7"],
  position: 4,
  publishedAt: "2017-08-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1340524",
      externalLink: "https://www.themoviedb.org/tv/1399/season/7/episode/4",
    },
  ],
  title: "The Spoils of War",
  episodeType: "standard",
  stillPath: "/hH9gSHcisHqoux734Q2SdLPLmsL.jpg",
  voteAverage: 8.8,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
