import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS04e07 = {
  id: "01a1884b-ef66-7599-8216-16de319ee7b5",
  type: "page-type/episode",
  slug: "ncis-s04e07",
  description:
    "When a Marine Colonel dies in an explosion at a military golf course, the NCIS team must investigate a suspected terrorist attack with the help from the Army Criminal Investigative Division.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-4"],
  position: 7,
  publishedAt: "2006-11-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334478",
      externalLink: "https://www.themoviedb.org/tv/4614/season/4/episode/7",
    },
  ],
  title: "Sandblast",
  episodeType: "standard",
  stillPath: "/awjVrlTDaYULbpi1mtDafMihtZb.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
