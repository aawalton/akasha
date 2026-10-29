import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theChosenS01e02 = {
  id: "01a18856-9869-72a2-bf7d-a08e0da99d1f",
  type: "page-type/episode",
  slug: "the-chosen-s01e02",
  description:
    "Matthew validates Simon's claims with Praetor Quintus, Nicodemus investigates the miracle reported in the Red Quarter, and Mary receives surprise guests at her Shabbat dinner.",
  ownLength: 38,
  ownProgress: 0,
  partOfCollections: ["season/the-chosen-season-1"],
  position: 2,
  publishedAt: "2019-04-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1757406",
      externalLink: "https://www.themoviedb.org/tv/85077/season/1/episode/2",
    },
  ],
  title: "Shabbat",
  episodeType: "standard",
  stillPath: "/4eSOVXHLoBRukvkedJn4gb83FCO.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:45:38.921Z",
  updatedAt: "2026-10-29T15:45:38.921Z",
} as const satisfies Episode
