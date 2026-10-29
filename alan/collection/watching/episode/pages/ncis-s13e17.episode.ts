import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS13e17 = {
  id: "01a1884b-ef74-779b-8ef0-85de80e46e53",
  type: "page-type/episode",
  slug: "ncis-s13e17",
  description:
    "The NCIS agents’ personal plans are interrupted when each of them catches errors in a seemingly cut-and-dried case.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-13"],
  position: 17,
  publishedAt: "2016-03-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1172911",
      externalLink: "https://www.themoviedb.org/tv/4614/season/13/episode/17",
    },
  ],
  title: "After Hours",
  episodeType: "standard",
  stillPath: "/o1rDtum2F6JzZaYGfSeiCY4I7oM.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
