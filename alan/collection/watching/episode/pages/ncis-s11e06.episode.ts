import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS11e06 = {
  id: "01a1884b-ef71-7743-9d85-5d4244ec6bcb",
  type: "page-type/episode",
  slug: "ncis-s11e06",
  description:
    "The Coast Guard Investigative Service works with the NCIS team when an explosion occurs on an oil rig.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-11"],
  position: 6,
  publishedAt: "2013-10-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "970552",
      externalLink: "https://www.themoviedb.org/tv/4614/season/11/episode/6",
    },
  ],
  title: "Oil & Water",
  episodeType: "standard",
  stillPath: "/n2x3RqvfbwOIUc6k1v9RrP8eZR0.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
