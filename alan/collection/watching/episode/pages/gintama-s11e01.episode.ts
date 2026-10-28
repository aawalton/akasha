import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gintamaS11e01 = {
  id: "01a183d6-3278-7337-85af-ab0a8ebe9fd6",
  type: "page-type/episode",
  slug: "gintama-s11e01",
  description:
    "Takasugi enters the fray, and he and the Kiheitai change the entire dynamic of the battle in the Heavenly Bird.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gintama-season-11"],
  position: 1,
  publishedAt: "2018-07-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1516792",
      externalLink: "https://www.themoviedb.org/tv/57041/season/11/episode/1",
    },
  ],
  title: "The Evildoers Who Do Good",
  episodeType: "standard",
  stillPath: "/u9ZXPr8RNN2xLQBPbXzbfv49Rsn.jpg",
  voteAverage: 9.3,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Episode
