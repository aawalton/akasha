import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS01e09 = {
  id: "01a1884a-e0e8-7678-addf-ec4096c2db8f",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s01e09",
  description:
    "Forensic scientist Abby Sciuto joins the Los Angeles NCIS team when a murder case resembles the pattern for a serial killer she has been tracking.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-1"],
  position: 9,
  publishedAt: "2009-11-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557282",
      externalLink: "https://www.themoviedb.org/tv/17610/season/1/episode/9",
    },
  ],
  title: "Random on Purpose",
  episodeType: "standard",
  stillPath: "/d7ChgHsu6cobDo7cHLHT3j77Bd1.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
