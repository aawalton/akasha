import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS02e04 = {
  id: "01a18855-67e7-768c-a3b7-5a195e27f7ff",
  type: "page-type/episode",
  slug: "steven-universe-s02e04",
  description:
    "In this non-canon episode, Uncle Grandpa arrives to aid Steven in unlocking the power of his gem.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-2"],
  position: 4,
  publishedAt: "2015-04-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1048305",
      externalLink: "https://www.themoviedb.org/tv/61175/season/2/episode/4",
    },
  ],
  title: "Say Uncle",
  episodeType: "standard",
  stillPath: "/1NtQxJ5q6zT6F5y5E1JL2miyWxM.jpg",
  voteAverage: 5.4,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
