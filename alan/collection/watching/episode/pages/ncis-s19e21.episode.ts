import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS19e21 = {
  id: "01a1884b-ef81-78e7-972f-241bad1aa5df",
  type: "page-type/episode",
  slug: "ncis-s19e21",
  description:
    "When Agent Parker is framed for murder, the team puts their jobs and lives on the line to buy time and uncover the truth.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-19"],
  position: 21,
  publishedAt: "2022-05-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3679922",
      externalLink: "https://www.themoviedb.org/tv/4614/season/19/episode/21",
    },
  ],
  title: "Birds of a Feather",
  episodeType: "finale",
  stillPath: "/5RADGfzUPWFN0JWhzTzOyY4Gh4c.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
