import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS04e07 = {
  id: "01a18851-3df6-73a7-a410-cb6dae813e93",
  type: "page-type/episode",
  slug: "person-of-interest-s04e07",
  description:
    "Shaw joins a team of international thieves in order to keep tabs on the latest POI, but an unexpected turn of events puts her in danger of being detected by Samaritan.  Also, Finch and Root undertake a dangerous sabotage mission.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-4"],
  position: 7,
  publishedAt: "2014-11-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010718",
      externalLink: "https://www.themoviedb.org/tv/1411/season/4/episode/7",
    },
  ],
  title: "Honor Among Thieves",
  episodeType: "standard",
  stillPath: "/zpMSQCQBe9qBcQF4IG4Lm0jxaFc.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
