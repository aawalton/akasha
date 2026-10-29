import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS16e08 = {
  id: "01a1884b-ef78-760d-8b59-7e05531e8335",
  type: "page-type/episode",
  slug: "ncis-s16e08",
  description:
    "McGee and Bishop travel to Afghanistan after a murder case in the States is linked to a string of soldiers killed by friendly fire overseas.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-16"],
  position: 8,
  publishedAt: "2018-11-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1617240",
      externalLink: "https://www.themoviedb.org/tv/4614/season/16/episode/8",
    },
  ],
  title: "Friendly Fire",
  episodeType: "standard",
  stillPath: "/1OBc6gMxtMTqXIKjbiDLpENB2am.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
