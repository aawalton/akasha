import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS04e11 = {
  id: "01a1884b-ef66-77fb-aa83-ae972b3eb479",
  type: "page-type/episode",
  slug: "ncis-s04e11",
  description:
    'When a robotic vehicle named "Otto," a part of a high-level project of the Department of Defense, causes a death of a Navy Lieutenant, and later almost kills Abby, the NCIS team must find out who sabotaged the vehicle and murdered the Lieutenant.',
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-4"],
  position: 11,
  publishedAt: "2006-12-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334481",
      externalLink: "https://www.themoviedb.org/tv/4614/season/4/episode/11",
    },
  ],
  title: "Driven",
  episodeType: "mid-season",
  stillPath: "/pOA6vcfO9Zvd478qiLWyFofGHWg.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
