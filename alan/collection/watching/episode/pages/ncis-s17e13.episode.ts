import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS17e13 = {
  id: "01a1884b-ef79-7a02-87e0-5abbdec9d1f5",
  type: "page-type/episode",
  slug: "ncis-s17e13",
  description:
    "After a body is found at an unmanned aerial vehicle testing site, the NCIS team must determine if the death was murder or an accident.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-17"],
  position: 13,
  publishedAt: "2020-01-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2049791",
      externalLink: "https://www.themoviedb.org/tv/4614/season/17/episode/13",
    },
  ],
  title: "Sound Off",
  episodeType: "standard",
  stillPath: "/xeCA8AW3ACjev9TrYwzptpQNV0r.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
