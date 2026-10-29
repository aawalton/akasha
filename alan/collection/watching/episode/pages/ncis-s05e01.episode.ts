import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS05e01 = {
  id: "01a1884b-ef67-7c0a-b893-c49fb9ca54ce",
  type: "page-type/episode",
  slug: "ncis-s05e01",
  description:
    "The NCIS team uncover a huge secret, as their mission to capture La Grenouille comes to an explosive and deadly conclusion.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-5"],
  position: 1,
  publishedAt: "2007-09-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334453",
      externalLink: "https://www.themoviedb.org/tv/4614/season/5/episode/1",
    },
  ],
  title: "Bury Your Dead",
  episodeType: "standard",
  stillPath: "/nyzGZwuVUi9nQgIWmfpojdFbOPI.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
