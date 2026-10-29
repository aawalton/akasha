import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const houseOfTheDragonS03e04 = {
  id: "01a18849-a937-7833-88b5-eeebfd43cc15",
  type: "page-type/episode",
  slug: "house-of-the-dragon-s03e04",
  description: "Ormund's invasion of Tumbleton forces Rhaenyra into a corner.",
  ownLength: 62,
  ownProgress: 0,
  partOfCollections: ["season/house-of-the-dragon-season-3"],
  position: 4,
  publishedAt: "2026-07-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7196567",
      externalLink: "https://www.themoviedb.org/tv/94997/season/3/episode/4",
    },
  ],
  title: "Tumbleton",
  episodeType: "standard",
  stillPath: "/kcKcglqhlje5zqIadRQgc7tvWMN.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:31:31.254Z",
  updatedAt: "2026-10-29T15:31:31.254Z",
} as const satisfies Episode
