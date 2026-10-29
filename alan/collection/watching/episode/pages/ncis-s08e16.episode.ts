import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS08e16 = {
  id: "01a1884b-ef6d-7aad-b699-543804659927",
  type: "page-type/episode",
  slug: "ncis-s08e16",
  description:
    "The dismembered fingertips and teeth of a murdered Marine are discovered in the stolen purse of a pickpocketer, launching NCIS on a mission to find a cold-blooded killer.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-8"],
  position: 16,
  publishedAt: "2011-02-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334582",
      externalLink: "https://www.themoviedb.org/tv/4614/season/8/episode/16",
    },
  ],
  title: "Kill Screen",
  episodeType: "standard",
  stillPath: "/jLkIw251J0msDFgFCFGECqhPkrs.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
