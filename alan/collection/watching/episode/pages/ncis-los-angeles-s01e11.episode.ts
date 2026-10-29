import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS01e11 = {
  id: "01a1884a-e0e8-7b5e-b0f8-4ada3e6e3986",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s01e11",
  description:
    "The death of a Petty Officer leads the NCIS team to a teenager in Sam's life. Meanwhile, Hetty is concerned about the effect that the workload is having on the team.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-1"],
  position: 11,
  publishedAt: "2010-01-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557284",
      externalLink: "https://www.themoviedb.org/tv/17610/season/1/episode/11",
    },
  ],
  title: "Breach",
  episodeType: "standard",
  stillPath: "/rD0NawFijzlUDtNh1bbolPNxgTo.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
