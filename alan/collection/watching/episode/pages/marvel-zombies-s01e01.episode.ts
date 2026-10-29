import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const marvelZombiesS01e01 = {
  id: "01a1884a-52df-78a5-8306-ed18d01c968f",
  type: "page-type/episode",
  slug: "marvel-zombies-s01e01",
  description: "Lone survivors face an unforgiving world of horrors.",
  ownLength: 38,
  ownProgress: 0,
  partOfCollections: ["season/marvel-zombies-miniseries"],
  position: 1,
  publishedAt: "2025-09-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3335323",
      externalLink: "https://www.themoviedb.org/tv/138505/season/1/episode/1",
    },
  ],
  title: "Episode 1",
  episodeType: "standard",
  stillPath: "/25QjykMVOADHoKBre3bLovFrz0j.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:32:14.686Z",
  updatedAt: "2026-10-29T15:32:14.686Z",
} as const satisfies Episode
