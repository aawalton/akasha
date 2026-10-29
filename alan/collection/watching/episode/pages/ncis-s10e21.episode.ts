import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS10e21 = {
  id: "01a1884b-ef70-7bed-a338-1c34c95b152e",
  type: "page-type/episode",
  slug: "ncis-s10e21",
  description:
    "Ziva continues to pursue revenge against Eli's killer, Ilan Bodnar, and Vance continues to endorse her actions despite orders from Homeland Security to rein them in.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-10"],
  position: 21,
  publishedAt: "2013-04-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334691",
      externalLink: "https://www.themoviedb.org/tv/4614/season/10/episode/21",
    },
  ],
  title: "Berlin",
  episodeType: "standard",
  stillPath: "/gzNh9zbotIbWfpMYXe2Zfzijf2W.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
