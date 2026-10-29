import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS02e03 = {
  id: "01a18849-08b2-74dc-a95e-de532c637bd7",
  type: "page-type/episode",
  slug: "game-of-thrones-s02e03",
  description:
    "Tyrion roots out a spy; Catelyn meets a new king and queen; Bran dreams; Theon drowns.",
  ownLength: 53,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-2"],
  position: 3,
  publishedAt: "2012-04-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "63068",
      externalLink: "https://www.themoviedb.org/tv/1399/season/2/episode/3",
    },
  ],
  title: "What Is Dead May Never Die",
  episodeType: "standard",
  stillPath: "/neKkHgfX7dgi4E47GKT7bYciq93.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
