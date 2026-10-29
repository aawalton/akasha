import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS02e03 = {
  id: "01a1884b-ef63-74e0-b6be-831744a6996f",
  type: "page-type/episode",
  slug: "ncis-s02e03",
  description:
    "The NCIS team are called in to investigate when a perfectly functioning Marine helicopter is found in the middle of a crop circle.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-2"],
  position: 3,
  publishedAt: "2004-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334498",
      externalLink: "https://www.themoviedb.org/tv/4614/season/2/episode/3",
    },
  ],
  title: "Vanished",
  episodeType: "standard",
  stillPath: "/ApdYPp0gz0VM31WaiLJEocDSbWx.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
