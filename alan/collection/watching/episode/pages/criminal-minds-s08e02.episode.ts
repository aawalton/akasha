import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS08e02 = {
  id: "01a18844-d7ef-74a3-99ea-e1370213fbae",
  type: "page-type/episode",
  slug: "criminal-minds-s08e02",
  description:
    "When the bodies of two seemingly unrelated victims are found just hours apart in San Diego and Los Angeles respectively, the BAU suspects that that not one, but two killers are working together to commit these murders.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-8"],
  position: 2,
  publishedAt: "2012-10-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283385",
      externalLink: "https://www.themoviedb.org/tv/4057/season/8/episode/2",
    },
  ],
  title: "The Pact",
  episodeType: "standard",
  stillPath: "/80iH9aCU9Hk08R6SVmyYsDYFpwU.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
