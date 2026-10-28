import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gintamaS11e10 = {
  id: "01a183d6-3278-75d1-bf18-0e77a1161b09",
  type: "page-type/episode",
  slug: "gintama-s11e10",
  description:
    "Shinpachi is forced into a plot to assassinate the inaugural prime minister of Japan, Donald Zuramp!",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gintama-season-11"],
  position: 10,
  publishedAt: "2018-09-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1558932",
      externalLink: "https://www.themoviedb.org/tv/57041/season/11/episode/10",
    },
  ],
  title: "Specter",
  episodeType: "standard",
  stillPath: "/v7tg4rmHyQQYxUKxBFYpfkUsT5c.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Episode
