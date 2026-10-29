import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS23e07 = {
  id: "01a1884b-ef85-71fb-a530-75507e5bef67",
  type: "page-type/episode",
  slug: "ncis-s23e07",
  description:
    "A kidnapped teen leads the team to a Navy SEAL who survived captivity by the Taliban but may have committed murder after returning home. Also, Jimmy finally shares his findings about the mysterious death of Parker’s mother with his boss.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-23"],
  position: 7,
  publishedAt: "2025-12-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6632808",
      externalLink: "https://www.themoviedb.org/tv/4614/season/23/episode/7",
    },
  ],
  title: "God Only Knows",
  episodeType: "standard",
  stillPath: "/9FMSM3GpHWIYv7A6yILLZT5xuld.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
