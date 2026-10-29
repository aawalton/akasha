import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS22e16 = {
  id: "01a1884b-ef84-730f-84de-5294d63711d8",
  type: "page-type/episode",
  slug: "ncis-s22e16",
  description:
    "A girls' night out takes an unexpected turn when NCIS is called to investigate the motive of a possible arsonist.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-22"],
  position: 16,
  publishedAt: "2025-03-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6030186",
      externalLink: "https://www.themoviedb.org/tv/4614/season/22/episode/16",
    },
  ],
  title: "Ladies' Night",
  episodeType: "standard",
  stillPath: "/1yr73lvjrtcLI2hpanzxkaLaIim.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
