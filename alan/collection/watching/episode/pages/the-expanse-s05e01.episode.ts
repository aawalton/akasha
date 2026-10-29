import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theExpanseS05e01 = {
  id: "01a18857-1f7c-78d8-950e-7ff50aefa878",
  type: "page-type/episode",
  slug: "the-expanse-s05e01",
  description:
    "Holden tries to convince Fred Johnson to destroy the last sample of protomolecule. Naomi gets an important lead to her son. On Luna, Avasarala begins to hunt for Marco Inaros.",
  ownLength: 53,
  ownProgress: 0,
  partOfCollections: ["season/the-expanse-season-5"],
  position: 1,
  publishedAt: "2020-12-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2457727",
      externalLink: "https://www.themoviedb.org/tv/63639/season/5/episode/1",
    },
  ],
  title: "Exodus",
  episodeType: "standard",
  stillPath: "/1QuHHmcPUsl0pPsqesVQN68f8VU.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:46:13.498Z",
  updatedAt: "2026-10-29T15:46:13.498Z",
} as const satisfies Episode
