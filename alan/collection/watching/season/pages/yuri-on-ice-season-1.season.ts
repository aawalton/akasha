import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const yuriOnIceSeason1 = {
  id: "01a183d6-7e4d-736b-b785-f39ee9cb385a",
  type: "page-type/season",
  slug: "yuri-on-ice-season-1",
  description:
    "Figure skater Yuri Katsuki flops in his latest season. When five-time world champion Victor Nikiforov becomes his coach, he gets another chance.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/yuri-on-ice"],
  position: 1,
  publishedAt: "2016-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "80797",
      externalLink: "https://www.themoviedb.org/tv/68129/season/1",
    },
  ],
  title: "Yuri!!! on Ice Season 1",
  posterPath: "/ArCIHv44gLLdjqPTbeHLRtRkF8q.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-28T18:47:14.763Z",
  updatedAt: "2026-10-28T18:47:14.763Z",
} as const satisfies Season
