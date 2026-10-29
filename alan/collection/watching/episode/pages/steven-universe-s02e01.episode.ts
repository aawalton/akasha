import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS02e01 = {
  id: "01a18855-67e7-7a60-b09a-4ae0e617769b",
  type: "page-type/episode",
  slug: "steven-universe-s02e01",
  description:
    "Steven tries to avoid Connie so he won't have to tell her about his ordeal with the Homeworld Gems from the previous episodes.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-2"],
  position: 1,
  publishedAt: "2015-03-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1048265",
      externalLink: "https://www.themoviedb.org/tv/61175/season/2/episode/1",
    },
  ],
  title: "Full Disclosure",
  episodeType: "standard",
  stillPath: "/kPcihHJ8U0ZEOVtMOWWZhDbr5E6.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
