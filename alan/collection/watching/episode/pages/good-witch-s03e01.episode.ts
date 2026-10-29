import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS03e01 = {
  id: "01a18849-3528-772d-acfe-c4ee2cee53b2",
  type: "page-type/episode",
  slug: "good-witch-s03e01",
  description:
    "The whole town anxiously awaits the impending blooming of the Middleton Merriwick, but when the plant is cut, it has dramatic impact upon the Merriwick women. Grace begins to suspect Nick is going to ask her out.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-3"],
  position: 1,
  publishedAt: "2017-04-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1293624",
      externalLink: "https://www.themoviedb.org/tv/61864/season/3/episode/1",
    },
  ],
  title: "A Budding Romance",
  episodeType: "standard",
  stillPath: "/xBQHNURFH4Dup6RWKKew1GxQMVA.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
