import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS11e17 = {
  id: "01a1884b-ef71-7e8e-a42d-de373aac8bcb",
  type: "page-type/episode",
  slug: "ncis-s11e17",
  description:
    "After a bomb detonates in the dressing room at a military charity concert, the NCIS team must determine if the target was a washed-up 1980s rocker or if the bomb was part of a larger scheme.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-11"],
  position: 17,
  publishedAt: "2014-03-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "972980",
      externalLink: "https://www.themoviedb.org/tv/4614/season/11/episode/17",
    },
  ],
  title: "Rock and a Hard Place",
  episodeType: "standard",
  stillPath: "/iptHEbEe0Dikc6lc5dhqO7STeQm.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
