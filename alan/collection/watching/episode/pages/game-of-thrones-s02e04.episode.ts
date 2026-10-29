import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS02e04 = {
  id: "01a18849-08b2-7a05-a1b2-c6556ebe042d",
  type: "page-type/episode",
  slug: "game-of-thrones-s02e04",
  description:
    "Catelyn tries to save two kings from themselves; Tyrion practices coercion; Robb meets a foreigner; Dany finds her ally.",
  ownLength: 51,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-2"],
  position: 4,
  publishedAt: "2012-04-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "63069",
      externalLink: "https://www.themoviedb.org/tv/1399/season/2/episode/4",
    },
  ],
  title: "Garden of Bones",
  episodeType: "standard",
  stillPath: "/5LhAdNG7NGipDOv2dF9ZPMAe2qh.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
