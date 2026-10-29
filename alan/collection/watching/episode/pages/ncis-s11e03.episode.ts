import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS11e03 = {
  id: "01a1884b-ef70-7797-ae1f-161744b1a206",
  type: "page-type/episode",
  slug: "ncis-s11e03",
  description: "The NCIS team must rely on Twitter for a case involving a missing Navy Lieutenant.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-11"],
  position: 3,
  publishedAt: "2013-10-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334698",
      externalLink: "https://www.themoviedb.org/tv/4614/season/11/episode/3",
    },
  ],
  title: "Under the Radar",
  episodeType: "standard",
  stillPath: "/d3OLrztIaROc5V76PIOfk86ZqBQ.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
