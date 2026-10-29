import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS04e03 = {
  id: "01a1884b-ef66-7447-85fa-5619c45d8455",
  type: "page-type/episode",
  slug: "ncis-s04e03",
  description:
    "An abandoned car, registered to a missing Navy Lieutenant, is found with blood stains inside. The NCIS team learn that the missing Lieutenant was profiling men, trying to find a perfect man for herself.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-4"],
  position: 3,
  publishedAt: "2006-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334475",
      externalLink: "https://www.themoviedb.org/tv/4614/season/4/episode/3",
    },
  ],
  title: "Singled Out",
  episodeType: "standard",
  stillPath: "/gFJyiuK4KPcIbQNXuTBsPCO4Quo.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
