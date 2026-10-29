import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS03e11 = {
  id: "01a18848-3732-7dc4-82f7-40d2062839d0",
  type: "page-type/episode",
  slug: "eureka-s03e11",
  description:
    "Dr. Tess Fontana reopens Section 5, causing objects to become ambulatory , possibly due to poltergeists.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-3"],
  position: 11,
  publishedAt: "2009-07-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335262",
      externalLink: "https://www.themoviedb.org/tv/4620/season/3/episode/11",
    },
  ],
  title: "Insane In The P-Brane",
  episodeType: "standard",
  stillPath: "/y3aYrpSnKMLFfTu1KGbLexaj52Y.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
