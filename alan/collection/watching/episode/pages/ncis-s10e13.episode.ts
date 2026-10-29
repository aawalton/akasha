import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS10e13 = {
  id: "01a1884b-ef70-7f55-a7d8-4a80d9ad8d21",
  type: "page-type/episode",
  slug: "ncis-s10e13",
  description:
    "The NCIS team investigates a Marine’s car accident and ignites some upsetting past memories for Abby as a young girl on the trail of her first “case”.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-10"],
  position: 13,
  publishedAt: "2013-01-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334682",
      externalLink: "https://www.themoviedb.org/tv/4614/season/10/episode/13",
    },
  ],
  title: "Hit and Run",
  episodeType: "standard",
  stillPath: "/y58thwXnoILwZ9ZiX4yaL4rhG0M.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
