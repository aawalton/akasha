import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const marvelZombiesS01e03 = {
  id: "01a1884a-52df-7a2f-bdb3-fab37f38a060",
  type: "page-type/episode",
  slug: "marvel-zombies-s01e03",
  description: "The rotting dead will taste their fear.",
  ownLength: 33,
  ownProgress: 0,
  partOfCollections: ["season/marvel-zombies-miniseries"],
  position: 3,
  publishedAt: "2025-09-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5759647",
      externalLink: "https://www.themoviedb.org/tv/138505/season/1/episode/3",
    },
  ],
  title: "Episode 3",
  episodeType: "standard",
  stillPath: "/8frDsFuOxAVVFzACTMQsk8vDXcP.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:32:14.686Z",
  updatedAt: "2026-10-29T15:32:14.686Z",
} as const satisfies Episode
