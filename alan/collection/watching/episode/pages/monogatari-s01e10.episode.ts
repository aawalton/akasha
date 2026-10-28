import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monogatariS01e10 = {
  id: "01a183db-7939-77f8-8ed1-49d7ed6c5ee0",
  type: "page-type/episode",
  slug: "monogatari-s01e10",
  description:
    "Koyomi taps into Meme’s powers in order to lift the snake’s curse from Nadeko Sengoku, a mysterious girl he encounters at the temple.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/monogatari-season-1"],
  position: 10,
  publishedAt: "2009-09-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "907798",
      externalLink: "https://www.themoviedb.org/tv/46195/season/1/episode/10",
    },
  ],
  title: "Nadeko Snake (2)",
  episodeType: "standard",
  stillPath: "/mVM65DzTkyJ4Efl1O4C86xOz0C6.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-28T18:52:41.143Z",
  updatedAt: "2026-10-28T18:52:41.143Z",
} as const satisfies Episode
