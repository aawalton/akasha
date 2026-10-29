import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS11e03 = {
  id: "01a18844-d7f4-72cb-885d-6c3a8e488e0c",
  type: "page-type/episode",
  slug: "criminal-minds-s11e03",
  description:
    "When brides-to-be in Savannah are killed on the eve of their nuptials, the BAU suspects a jilted UnSub is at work.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-11"],
  position: 3,
  publishedAt: "2015-10-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1106598",
      externalLink: "https://www.themoviedb.org/tv/4057/season/11/episode/3",
    },
  ],
  title: "'Til Death Do Us Part",
  episodeType: "standard",
  stillPath: "/7rd542cuWMMhOPkFXrLpHAS40RJ.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
