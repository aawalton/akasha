import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS03e21 = {
  id: "01a18855-67ea-7547-b432-bab63fdeb159",
  type: "page-type/episode",
  slug: "steven-universe-s03e21",
  description:
    "Steven and Amethyst visit some friends in the country but Amethyst isn't being herself.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-3"],
  position: 21,
  publishedAt: "2016-08-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1212166",
      externalLink: "https://www.themoviedb.org/tv/61175/season/3/episode/21",
    },
  ],
  title: "Beta",
  episodeType: "standard",
  stillPath: "/epga1MlLcjnImC3GSWcMK97VcV8.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
