import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS01e13 = {
  id: "01a18881-51a0-71cb-8f8f-a43dbd656701",
  type: "page-type/episode",
  slug: "white-collar-s01e13",
  description:
    "Neal helps an old friend whose daughter has been kidnapped, without realizing that it's all a trap from an old enemy.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/white-collar-season-1"],
  position: 13,
  publishedAt: "2010-03-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "596257",
      externalLink: "https://www.themoviedb.org/tv/21510/season/1/episode/13",
    },
  ],
  title: "Front Man",
  episodeType: "standard",
  stillPath: "/sV1geIJ3V1DdabXUvdftvvPdjBZ.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
