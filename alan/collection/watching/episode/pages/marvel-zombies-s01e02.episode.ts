import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const marvelZombiesS01e02 = {
  id: "01a1884a-52df-78a8-8cfb-b8c66e00c8a1",
  type: "page-type/episode",
  slug: "marvel-zombies-s01e02",
  description: "On the open road, the hunger for flesh rules all.",
  ownLength: 34,
  ownProgress: 0,
  partOfCollections: ["season/marvel-zombies-miniseries"],
  position: 2,
  publishedAt: "2025-09-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5759646",
      externalLink: "https://www.themoviedb.org/tv/138505/season/1/episode/2",
    },
  ],
  title: "Episode 2",
  episodeType: "standard",
  stillPath: "/vvbPNdHl8gjuRnrU0YhbHrNXLlS.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T15:32:14.686Z",
  updatedAt: "2026-10-29T15:32:14.686Z",
} as const satisfies Episode
