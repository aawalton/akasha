import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS03e03 = {
  id: "01a18855-67e9-7ad9-a203-805ff3c0c0da",
  type: "page-type/episode",
  slug: "steven-universe-s03e03",
  description: "Steven and Lapis Lazuli go on an adventure.",
  ownLength: 11,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-3"],
  position: 3,
  publishedAt: "2016-05-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1194629",
      externalLink: "https://www.themoviedb.org/tv/61175/season/3/episode/3",
    },
  ],
  title: "Same Old World",
  episodeType: "standard",
  stillPath: "/yA2AYWSbSSZxjE67BmcG7aHWo6v.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
