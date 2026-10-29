import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS02e11 = {
  id: "01a1884b-ef64-73c1-be13-6ea6fc018b46",
  type: "page-type/episode",
  slug: "ncis-s02e11",
  description:
    "A dead body of a two-year-missing Navy officer appears on the bottom of a lake. The team investigate the case with a help of a private detective.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-2"],
  position: 11,
  publishedAt: "2005-01-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334506",
      externalLink: "https://www.themoviedb.org/tv/4614/season/2/episode/11",
    },
  ],
  title: "Black Water",
  episodeType: "standard",
  stillPath: "/sW05qHzN9BlLg3dZIJmkNoS0T2D.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
