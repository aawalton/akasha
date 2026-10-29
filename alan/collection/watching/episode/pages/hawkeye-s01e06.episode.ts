import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hawkeyeS01e06 = {
  id: "01a1887e-af9c-783b-a6b3-34f462e2c3ec",
  type: "page-type/episode",
  slug: "hawkeye-s01e06",
  description:
    "Clint and Kate’s partnership is tested as they face the consequences of exposing the conspiracy.",
  ownLength: 62,
  ownProgress: 62,
  partOfCollections: ["season/hawkeye-miniseries"],
  position: 6,
  publishedAt: "2021-12-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3301369",
      externalLink: "https://www.themoviedb.org/tv/88329/season/1/episode/6",
    },
  ],
  title: "So This Is Christmas?",
  episodeType: "finale",
  stillPath: "/nXuI42V8HgmyMlewU2tiOEEjKsC.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T16:29:26.300Z",
  updatedAt: "2026-10-29T16:29:26.300Z",
} as const satisfies Episode
