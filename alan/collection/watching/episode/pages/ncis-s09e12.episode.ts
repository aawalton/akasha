import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS09e12 = {
  id: "01a1884b-ef6e-7afb-a603-274cfb06ea17",
  type: "page-type/episode",
  slug: "ncis-s09e12",
  description:
    "An investigation into the murder of a Navy Commander leads the NCIS team to E.J. Barrett’s whereabouts.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-9"],
  position: 12,
  publishedAt: "2012-01-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334604",
      externalLink: "https://www.themoviedb.org/tv/4614/season/9/episode/12",
    },
  ],
  title: "Housekeeping",
  episodeType: "standard",
  stillPath: "/flExMGv2puo9JiJTXeIMmYRJwJ3.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
