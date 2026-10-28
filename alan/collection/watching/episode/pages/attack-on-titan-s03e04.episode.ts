import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const attackOnTitanS03e04 = {
  id: "01a183d1-6a24-7498-b541-f511db7b1b6a",
  type: "page-type/episode",
  slug: "attack-on-titan-s03e04",
  description:
    "On the run and running out of time, the Scouts must entrust their lives to others if they plan on surviving.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/attack-on-titan-season-3"],
  position: 4,
  publishedAt: "2018-08-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1530239",
      externalLink: "https://www.themoviedb.org/tv/1429/season/3/episode/4",
    },
  ],
  title: "Trust",
  episodeType: "standard",
  stillPath: "/hHRzu09zqzwA2c2J5VF48zAbc78.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:41:41.918Z",
  updatedAt: "2026-10-28T18:41:41.918Z",
} as const satisfies Episode
