import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const inhumansS01e08 = {
  id: "01a18849-ba0f-7471-a42f-e0670762d580",
  type: "page-type/episode",
  slug: "inhumans-s01e08",
  description:
    "A reporter who specializes in scandals tails a gunman from a murder scene to a hotel that isn't on any map.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-inhumans-season-1"],
  position: 8,
  publishedAt: "2025-08-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6424177",
      externalLink: "https://www.themoviedb.org/tv/276288/season/1/episode/8",
    },
  ],
  title: "Spider",
  episodeType: "standard",
  stillPath: "/t5E4rGObv68cexQ8K7P2P5aK8uf.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:31:35.566Z",
  updatedAt: "2026-10-29T15:31:35.566Z",
} as const satisfies Episode
