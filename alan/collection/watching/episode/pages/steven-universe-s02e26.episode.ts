import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS02e26 = {
  id: "01a18855-67e8-7473-96b7-9c426168404c",
  type: "page-type/episode",
  slug: "steven-universe-s02e26",
  description:
    "Steven has a birthday party out at the barn, and decides he has some growing up to do.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-2"],
  position: 26,
  publishedAt: "2016-01-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1153959",
      externalLink: "https://www.themoviedb.org/tv/61175/season/2/episode/26",
    },
  ],
  title: "Steven's Birthday",
  episodeType: "standard",
  stillPath: "/hWk4cUvlEpWV6PBiZOHNtfPqc6b.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
