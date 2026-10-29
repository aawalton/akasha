import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS01e16 = {
  id: "01a1884b-ef62-797e-a888-897ba1858700",
  type: "page-type/episode",
  slug: "ncis-s01e16",
  description:
    "A terrorist holds Ducky, Gerald, and Kate hostage while NCIS investigate how exactly the terror organization member got a job at a Navy base.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-1"],
  position: 16,
  publishedAt: "2004-03-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334445",
      externalLink: "https://www.themoviedb.org/tv/4614/season/1/episode/16",
    },
  ],
  title: "Bête Noire",
  episodeType: "standard",
  stillPath: "/s13tfepNcoy6c72nE79xjbuntiW.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
