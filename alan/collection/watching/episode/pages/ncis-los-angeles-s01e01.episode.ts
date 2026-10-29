import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS01e01 = {
  id: "01a1884a-e0e7-7cb4-a844-aedb84c15f82",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s01e01",
  description:
    "Callen returns back to the NCIS Office of Special Projects to solve a kidnapping case.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-1"],
  position: 1,
  publishedAt: "2009-09-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557278",
      externalLink: "https://www.themoviedb.org/tv/17610/season/1/episode/1",
    },
  ],
  title: "Identity",
  episodeType: "standard",
  stillPath: "/yHEGO6g6v9j8eTwdC2kuzpyI90.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
